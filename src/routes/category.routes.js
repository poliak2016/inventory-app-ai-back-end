import { Router } from "express";
import { categoryController } from "../controllers/category.controller.js";
import { authMiddleware } from "../middleware/auth/authMiddleware.js";
import { validate } from "../middleware/validation/validate.middleware.js";
import { createCategorySchema, updateCategorySchema, categoryParamsSchema } from "../validationSchemas/category.schema.js";
import { paginationSchema } from "../validationSchemas/pagination.schema.js";

const router = Router();

router.post(
  "/", 
  authMiddleware, 
  validate(createCategorySchema, "body"), 
  categoryController.create
);

router.patch(
  "/:id",
  authMiddleware,
  validate(categoryParamsSchema, "params"),
  validate(updateCategorySchema, "body"),
  categoryController.update
);

router.delete(
  "/:id",
  authMiddleware,
  validate(categoryParamsSchema, "params"),
  categoryController.delete
);

router.get(
  "/",
  authMiddleware,
  validate(paginationSchema, "query"),
  categoryController.getAll
);

export default router

