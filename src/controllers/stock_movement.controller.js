import { asyncHandler } from "../middleware/api/async-handler.middleware.js";
import { createStockMovementService } from "../services/stock_movements.service.js";

export const createStockMovementsController = asyncHandler(async (req, res) => {
  const { productId, type, quantity, note } = req.body;

  const movement = await createStockMovementService({
    productId,
    type,
    quantity,
    createdBy: req.user.id, 
    note,
  });

  return res.status(201).json({
    id: movement.id,
    productId: movement.productId,
    type: movement.type,
    quantity: movement.quantity,
    note: movement.note,
    createdAt: movement.createdAt,
  });
});