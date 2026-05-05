import { Router } from "express";
import { categoryController } from "../controllers/category.controller.js";
import { authMiddleware } from "../middleware/auth/authMiddleware.js";
import { validate } from "../middleware/validation/validate.middleware.js";
import { createCategorySchema } from "../schemas/categorySchema.js";

const router = Router();

router.post(
  "/", 
  authMiddleware, 
  validate(createCategorySchema, "body"), 
  categoryController.create
);

export default router

