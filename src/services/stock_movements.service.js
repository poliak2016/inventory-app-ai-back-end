import { transactionFunc } from "../db/transaction.js";
import { productsRepository } from "../repositories/products.repository.js";
import { stockMovementsRepository } from "../repositories/stock_movement.repository.js";
import {
  StockMovementNotFoundError,
  InsufficientStockError,
  InvalidMovementTypeError,
} from "../errors/stock-movements/stockMovementErrors.js";

export const createStockMovementService = async (data) => {
  const { productId, type, quantity, createdBy, note } = data;

  return await transactionFunc(async (db) => {
    const product = await productsRepository.findById(productId, db);

    if (!product) {
      throw new StockMovementNotFoundError('Product');
    }

    const quantityBefore = product.quantity;
    let updatedProduct;

    if (type === "in") {
      updatedProduct = await productsRepository.increaseQuantity(productId, quantity, db);
    } else if (type === "out") {
      if (product.quantity < quantity) {
        throw new InsufficientStockError();
      }
      updatedProduct = await productsRepository.decreaseQuantity(productId, quantity, db);
    } else if (type === "adjustment") {
      updatedProduct = await productsRepository.setQuantity(productId, quantity, db);
    } else {
      throw new InvalidMovementTypeError();
    }

    const movement = await stockMovementsRepository.create(
      {
        productId,
        createdBy,
        type,
        quantity,
        quantityBefore,
        quantityAfter: updatedProduct.quantity,
        note,
      },
      db
    );

    return movement;
  });
};

export const getMovementsByProductIdService = async (data) => {
  const { productId } = data;

  const product = await productsRepository.findById(productId);

  if (!product) {
    throw new StockMovementNotFoundError('Product');
  }

  const limit = Math.min(Number(data.limit) || 20, 100);
  const offset = Math.max(Number(data.offset) || 0, 0);

  return await stockMovementsRepository.findByProductId({
    productId,
    limit,
    offset,
  });
};
