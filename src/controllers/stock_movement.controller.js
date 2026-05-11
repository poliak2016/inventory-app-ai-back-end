import { asyncHandler } from "../middleware/api/async-handler.middleware.js";
import { stockMovementsService } from "../services/stock_movements.service.js";

export const stockMovementsController = {
  createStockMovement: asyncHandler(async (req, res) => {
    const movement = await stockMovementsService.createStockMovement(req.body, req.user);

    return res.status(201).json({
      status: "success",
      data: movement,
    });
  }),

  getMovementsByProductId: asyncHandler(async (req, res) => {
    const { productId } = req.validated.params;
    const { limit, offset } = req.validated.query;

    const movements = await stockMovementsService.getMovementsByProductId({ productId, limit, offset });

    return res.status(200).json({
      status: "success",
      data: movements,
    });
  }),
};

