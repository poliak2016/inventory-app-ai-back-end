import { Router } from "express";
import { validate } from "../middleware/validation/validate.middleware.js";
import { authMiddleware } from "../middleware/auth/authMiddleware.js";
import {
  createStockMovementSchema,
  stockMovementParamsSchema,
  stockMovementHistoryQuerySchema,
} from "../schemas/stock_movement.schema.js";
import {
  createStockMovementsController,
  getMovementsByProductIdController,
} from "../controllers/stock_movement.controller.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(createStockMovementSchema),
  createStockMovementsController
);

router.get(
  "/:productId/history",
  authMiddleware,
  validate(stockMovementParamsSchema, "params"),
  validate(stockMovementHistoryQuerySchema, "query"),
  getMovementsByProductIdController
);

export default router;

