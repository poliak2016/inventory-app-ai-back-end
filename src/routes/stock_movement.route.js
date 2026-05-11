import { Router } from "express";
import { validate } from "../middleware/validation/validate.middleware.js";
import { authMiddleware } from "../middleware/auth/authMiddleware.js";
import {
  createStockMovementSchema,
  stockMovementParamsSchema,
  stockMovementHistoryQuerySchema,
} from "../schemas/stock_movement.schema.js";
import { stockMovementsController } from "../controllers/stock_movement.controller.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(createStockMovementSchema),
  stockMovementsController.createStockMovement
);

router.get(
  "/:productId/history",
  authMiddleware,
  validate(stockMovementParamsSchema, "params"),
  validate(stockMovementHistoryQuerySchema, "query"),
  stockMovementsController.getMovementsByProductId
);

export default router;

