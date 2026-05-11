import { transactionFunc } from "../db/transaction.js";
import { productsRepository } from "../repositories/products.repository.js";
import { stockMovementsRepository } from "../repositories/stock_movement.repository.js";
import { NotFoundError } from "../errors/base.error.js";
import {
  InsufficientStockError,
  InvalidMovementTypeError,
} from "../errors/stock-movements/stockMovementErrors.js";

export const stockMovementsService = {
  createStockMovement: async (data, user) => {
    const { productId, type, quantity, note } = data;
    const createdBy = user.id;

    return await transactionFunc(async (db) => {
      const product = await productsRepository.findById(productId, db);

      if (!product) {
        throw new NotFoundError('Product');
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
  },

  getMovementsByProductId: async (data) => {
    const { productId } = data;

    const product = await productsRepository.findById(productId);

    if (!product) {
      throw new NotFoundError('Product');
    }

    const limit = Math.min(Number(data.limit) || 20, 100);
    const offset = Math.max(Number(data.offset) || 0, 0);

    return await stockMovementsRepository.findByProductId({
      productId,
      limit,
      offset,
    });
  },
};
