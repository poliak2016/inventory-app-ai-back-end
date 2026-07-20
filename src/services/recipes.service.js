import { NotFoundError, ValidationError } from "../errors/base.error.js";
import { recipesRepository } from "../repositories/recipes.repository.js";
import { getOrganizationId } from "../shared/auth/getOrganizationId.js";
import { transactionFunc } from "../db/transaction.js";
import { productsRepository } from "../repositories/products.repository.js";

const computeFoodCost = (ingredients) => {
  return ingredients.reduce(
    (sum, ingredient) => sum + Number(ingredient.quantity) * Number(ingredient.productPrice),
    0
  );
};

const withFoodCost = (recipe, ingredients) => {
  const foodCost = computeFoodCost(ingredients);
  const foodCostPercentage = recipe.salePrice
    ? Number(((foodCost / Number(recipe.salePrice)) * 100).toFixed(2))
    : null;

  return {
    ...recipe,
    foodCost: Number(foodCost.toFixed(2)),
    foodCostPercentage,
  };
};

export const recipesService = {
  getAll: async (user, { limit, page, categoryId }) => {
    const organization_id = getOrganizationId(user);
    const offset = (page - 1) * limit;

    const { rows, total } = await recipesRepository.getAll(
      organization_id,
      limit,
      offset,
      categoryId ?? null
    );

    const recipes = await Promise.all(
      rows.map(async (recipe) => {
        const ingredients = await recipesRepository.getIngredients(recipe.id);
        return withFoodCost(recipe, ingredients);
      })
    );

    const hasMore = offset + limit < total;

    return {
      recipes,
      pagination: { total, page, limit, hasMore },
    };
  },

  getRecipeById: async (user, id) => {
    const organization_id = getOrganizationId(user);

    if (!id) {
      throw new ValidationError("Recipe id is required");
    }

    const recipe = await recipesRepository.findById(organization_id, id);
    if (!recipe) {
      throw new NotFoundError("Recipe");
    }

    const ingredients = await recipesRepository.getIngredients(id);

    return { ...withFoodCost(recipe, ingredients), ingredients };
  },

  createRecipe: async (user, recipeData) => {
    const organization_id = getOrganizationId(user);
    const { categoryId, ingredients, ...rest } = recipeData;
    const productsIds = ingredients.map((i) => i.productId)

    const foundProducts = await productsRepository.findByIds(organization_id, productsIds)

    if(productsIds.length !== foundProducts.length){
      throw new NotFoundError("Product")
    }

    return transactionFunc(async (client) => {
      const recipe = await recipesRepository.create(
        { ...rest, category_id: categoryId ?? null, organization_id },
        client
      );

      const insertedIngredients = await recipesRepository.replaceIngredients(
        recipe.id,
        ingredients,
        client
      );

      return { ...recipe, ingredients: insertedIngredients };
    });
  },

  updateRecipe: async (user, id, recipeData) => {
    const organization_id = getOrganizationId(user);

    if (!id) {
      throw new ValidationError("Recipe id is required");
    }

    const { categoryId, ingredients, ...rest } = recipeData;

    if(ingredients){
      const productsIds = ingredients.map((i) => i.productId)

      const foundProducts = await productsRepository.findByIds(organization_id, productsIds)

      if(productsIds.length !== foundProducts.length) throw new NotFoundError("Product")
    
    }

    return transactionFunc(async (client) => {
      const updated = await recipesRepository.update(
        organization_id,
        id,
        { ...rest, category_id: categoryId ?? null },
        client
      );

      if (!updated) {
        throw new NotFoundError("Recipe");
      }

      const newIngredients = ingredients
        ? await recipesRepository.replaceIngredients(id, ingredients, client)
        : await recipesRepository.getIngredients(id, client);

      return { ...updated, ingredients: newIngredients };
    });
  },

  deleteRecipe: async (user, id) => {
    const organization_id = getOrganizationId(user);

    if (!id) {
      throw new ValidationError("Recipe id is required");
    }

    const result = await recipesRepository.delete(organization_id, id);
    if (!result) {
      throw new NotFoundError("Recipe");
    }

    return true;
  },
};
