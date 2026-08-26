import { Router } from "express";
import { suppliersController } from "../controllers/suppliers.controller.js";
import { authMiddleware } from "../middleware/auth/authMiddleware.js";
import { validate } from "../middleware/validation/validate.middleware.js";
import { createSuppliersSchema } from "../validationSchemas/suppliers.schema.js";

const router = Router()

router.post(
  "/",
  authMiddleware,
  validate(createSuppliersSchema, "body"),
  suppliersController.create
)

router.get(
  "/",
  authMiddleware,
  suppliersController.getAll
)

export default router