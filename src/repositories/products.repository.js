import {logger } from "../config/logger.js";
import { getExecutor } from "../db/executor.js";
import { qCreateProduct, qFindProductById, qDeleteProduct, qUpdateProduct, qGetAll } from "../model/products.query.js";

export const productsRepository = {
  async getAll(db = null) {
    const executor = getExecutor(db);
    const { rows } = await executor.query(qGetAll);
    return rows;
  },

  async findById(id, db = null) {
    const executor = getExecutor(db);
    const { rows } = await executor.query(qFindProductById, [id]);
    return rows[0] ?? null;
  },

  async create({ name, price, quantity }, db = null) {
    const executor = getExecutor(db);
    const { rows } = await executor.query(qCreateProduct, [name, price, quantity]);
    return rows[0];
  },

  async update(id, { name, price, quantity, category_id }, db = null) {
    logger.info("SQL values", { values: [id, name, price, quantity, category_id] });
    const executor = getExecutor(db);
    const { rows } = await executor.query(qUpdateProduct, [id, name, price, quantity, category_id]);
    return rows[0] ?? null;
  },

  async delete(id, db = null) {
    const executor = getExecutor(db);
    const { rows } = await executor.query(qDeleteProduct, [id]);
    return rows[0] ?? null;
  }
}