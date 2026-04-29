import { Router } from "express";
import { validate } from "../middleware/validation/validate.middleware.js";
import { authMiddleware } from "../middleware/auth/authMiddleware.js";
import { createStockMovementSchema } from "../schemas/stock_movement.schema.js";
import { createStockMovementsController } from "../controllers/stock_movement.controller.js";

const router = Router()

router.post("/movements", authMiddleware, validate(createStockMovementSchema), createStockMovementsController)

export default router