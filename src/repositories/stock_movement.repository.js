import { getExecutor } from "../db/executor.js";
import { qCreateMovements, qGetMovementsByProductId } from "../query/stock_movements.query.js";

export const stockMovementsRepository = {
  create: async (data, db = null) => {
    const executor = getExecutor(db);

    const { rows } = await executor.query(qCreateMovements, [
      data.productId,
      data.createdBy,
      data.type,
      data.quantity,
      data.quantityBefore,
      data.quantityAfter,
      data.note ?? null,
    ]);

    return rows[0] ?? null;
  },

  findByProductId: async ({ productId, limit = 20, offset = 0 }, db = null) => {
    const executor = getExecutor(db);

    const { rows } = await executor.query(qGetMovementsByProductId, [
      productId,
      limit,
      offset,
    ]);

    return rows;
  },
};
