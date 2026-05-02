import { transactionFunc } from "../db/transaction.js";
import { productsRepository } from "../repositories/products.repository.js";
import { createStockMovementRepository } from "../repositories/stock_movement.repository.js";

export const createStockMovementService = async (data) => {
  const { productId, type, quantity, createdBy, note } = data;

  return await transactionFunc(async (db) => {
    const product = await productsRepository.findById(productId, db);

    if (!product) {
      throw new Error("Product not found");
    }

    const quantityBefore = product.quantity;
    let updatedProduct;

    if (type === "in") {
      updatedProduct = await productsRepository.increaseQuantity(productId, quantity, db);
    } else if (type === "out") {
      if (product.quantity < quantity) {
        throw new Error("Not enough stock");
      }

      updatedProduct = await productsRepository.decreaseQuantity(productId, quantity, db);
    } else if (type === "adjustment") {
      updatedProduct = await productsRepository.setQuantity(productId, quantity, db);
    } else {
      throw new Error("Invalid type");
    }

    const movement = await createStockMovementRepository(
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