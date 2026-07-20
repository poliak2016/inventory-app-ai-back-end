import { Router } from "express";
import { recipesController } from "../controllers/recipes.controller.js";
import { validate } from "../middleware/validation/validate.middleware.js";
import { requireRole } from "../middleware/auth/require-role.js";
import { authMiddleware } from "../middleware/auth/authMiddleware.js";
import {
  createRecipeSchema,
  updateRecipeSchema,
  recipeIdParamSchema,
  recipeQuerySchema,
} from "../validationSchemas/recipe.schema.js";

const router = Router();

router.get(
  "/",
  authMiddleware,
  validate(recipeQuerySchema, "query"),
  recipesController.getRecipes
);

router.get(
  "/:id",
  authMiddleware,
  validate(recipeIdParamSchema, "params"),
  recipesController.getRecipeById
);

router.post(
  "/",
  authMiddleware,
  requireRole("admin"),
  validate(createRecipeSchema, "body"),
  recipesController.createRecipe
);

router.put(
  "/:id",
  authMiddleware,
  requireRole("admin"),
  validate(recipeIdParamSchema, "params"),
  validate(updateRecipeSchema, "body"),
  recipesController.updateRecipe
);

router.delete(
  "/:id",
  authMiddleware,
  requireRole("admin"),
  validate(recipeIdParamSchema, "params"),
  recipesController.deleteRecipe
);

export default router;
