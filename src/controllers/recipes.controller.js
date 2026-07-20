import { asyncHandler } from "../middleware/api/async-handler.middleware.js";
import { recipesService } from "../services/recipes.service.js";

export const recipesController = {
  getRecipes: asyncHandler(async (req, res) => {
    const result = await recipesService.getAll(req.user, req.validated.query);
    return res.status(200).json({
      status: "success",
      data: result,
    });
  }),

  getRecipeById: asyncHandler(async (req, res) => {
    const { id } = req.validated.params;
    const recipe = await recipesService.getRecipeById(req.user, id);
    return res.status(200).json({
      status: "success",
      data: recipe,
    });
  }),

  createRecipe: asyncHandler(async (req, res) => {
    const recipe = await recipesService.createRecipe(req.user, req.validated.body);
    return res.status(201).json({
      status: "success",
      data: recipe,
    });
  }),

  updateRecipe: asyncHandler(async (req, res) => {
    const { id } = req.validated.params;
    const recipe = await recipesService.updateRecipe(req.user, id, req.validated.body);
    return res.status(200).json({
      status: "success",
      data: recipe,
    });
  }),

  deleteRecipe: asyncHandler(async (req, res) => {
    const { id } = req.validated.params;
    await recipesService.deleteRecipe(req.user, id);
    return res.status(204).send();
  }),
};
