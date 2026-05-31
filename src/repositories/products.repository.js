import { logger } from "../config/logger.js";
import { getExecutor } from "../db/executor.js";
import {
  qCreateProduct,
  qFindProductById,
  qDeleteProduct,
  qUpdateProduct,
  qIncreaseProductQuantity,
  qDecreaseProductQuantity,
  qSetProductQuantity,
  qGetAll,
  qCountProducts,
} from "../query/products.query.js";

export const productsRepository = {
  async getAll(organization_id, limit = 20, offset = 0, db = null) {
    const executor = getExecutor(db);
    const [ result, countResult ] = await Promise.all([
      executor.query(qGetAll, [organization_id, limit, offset]),
      executor.query(qCountProducts, [organization_id])
    ]);

    const rows = result.rows;
    const total = parseInt(countResult.rows[0].count);

    return { rows, total };
  },

  async findById(organization_id, id, db = null) {
    const executor = getExecutor(db);
    const { rows } = await executor.query(qFindProductById, [
      organization_id,
      id,
    ]);
    return rows[0] ?? null;
  },

  async create(
    { name, price, quantity, category_id, organization_id },
    db = null
  ) {
    const executor = getExecutor(db);
    const { rows } = await executor.query(qCreateProduct, [
      name,
      price,
      quantity,
      category_id,
      organization_id,
    ]);
    return rows[0];
  },

  async update(
    organization_id,
    id,
    { name, price, quantity, category_id },
    db = null
  ) {
    logger.info("SQL values", {
      values: [organization_id, id, name, price, quantity, category_id],
    });

    const executor = getExecutor(db);
    const { rows } = await executor.query(qUpdateProduct, [
      organization_id,
      id,
      name,
      price,
      quantity,
      category_id,
    ]);

    return rows[0] ?? null;
  },

  async increaseQuantity(organization_id, id, quantity, db = null) {
    const executor = getExecutor(db);
    const { rows } = await executor.query(qIncreaseProductQuantity, [
      organization_id,
      id,
      quantity,
    ]);
    return rows[0] ?? null;
  },

  async decreaseQuantity(organization_id, id, quantity, db = null) {
    const executor = getExecutor(db);
    const { rows } = await executor.query(qDecreaseProductQuantity, [
      organization_id,
      id,
      quantity,
    ]);
    return rows[0] ?? null;
  },

  async setQuantity(organization_id, id, quantity, db = null) {
    const executor = getExecutor(db);
    const { rows } = await executor.query(qSetProductQuantity, [
      organization_id,
      id,
      quantity,
    ]);
    return rows[0] ?? null;
  },

  async delete(organization_id, id, db = null) {
    const executor = getExecutor(db);
    const { rows } = await executor.query(qDeleteProduct, [
      organization_id,
      id,
    ]);
    return rows[0] ?? null;
  },
};