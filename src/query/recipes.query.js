export const RECIPES_TABLE = "recipes";
export const RECIPE_INGREDIENTS_TABLE = "recipe_ingredients";

export const RECIPES_COLUMNS = `
  id,
  name,
  instructions,
  yield_weight AS "yieldWeight",
  yield_unit AS "yieldUnit",
  portions,
  sale_price AS "salePrice",
  photo_url AS "photoUrl",
  organization_id,
  category_id AS "categoryId",
  created_at AS "createdAt",
  updated_at AS "updatedAt"
`;

export const qGetAll = `
  SELECT ${RECIPES_COLUMNS}
  FROM ${RECIPES_TABLE}
  WHERE organization_id = $1
    AND ($4::uuid IS NULL OR category_id = $4)
  ORDER BY created_at DESC
  LIMIT $2
  OFFSET $3
`;

export const qCountRecipes = `
  SELECT COUNT(*)
  FROM ${RECIPES_TABLE}
  WHERE organization_id = $1
    AND ($2::uuid IS NULL OR category_id = $2)
`;

export const qFindRecipeById = `
  SELECT ${RECIPES_COLUMNS}
  FROM ${RECIPES_TABLE}
  WHERE organization_id = $1
    AND id = $2
  LIMIT 1
`;

export const qCreateRecipe = `
  INSERT INTO ${RECIPES_TABLE} (
    name,
    instructions,
    yield_weight,
    yield_unit,
    portions,
    sale_price,
    photo_url,
    category_id,
    organization_id
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  RETURNING ${RECIPES_COLUMNS}
`;

export const qUpdateRecipe = `
  UPDATE ${RECIPES_TABLE}
  SET
    name = $3,
    instructions = $4,
    yield_weight = $5,
    yield_unit = $6,
    portions = $7,
    sale_price = $8,
    photo_url = $9,
    category_id = $10,
    updated_at = NOW()
  WHERE organization_id = $1
    AND id = $2
  RETURNING ${RECIPES_COLUMNS}
`;

export const qDeleteRecipe = `
  DELETE FROM ${RECIPES_TABLE}
  WHERE organization_id = $1
    AND id = $2
  RETURNING ${RECIPES_COLUMNS}
`;

export const RECIPE_INGREDIENT_COLUMNS = `
  ri.id,
  ri.recipe_id AS "recipeId",
  ri.product_id AS "productId",
  ri.quantity,
  p.name AS "productName",
  p.unit AS "productUnit",
  p.price AS "productPrice"
`;

export const qGetIngredientsByRecipeId = `
  SELECT ${RECIPE_INGREDIENT_COLUMNS}
  FROM ${RECIPE_INGREDIENTS_TABLE} ri
  JOIN products p ON p.id = ri.product_id
  WHERE ri.recipe_id = $1
  ORDER BY ri.created_at ASC
`;

export const qInsertIngredient = `
  INSERT INTO ${RECIPE_INGREDIENTS_TABLE} (recipe_id, product_id, quantity)
  VALUES ($1, $2, $3)
  RETURNING id, recipe_id AS "recipeId", product_id AS "productId", quantity
`;

export const qDeleteIngredientsByRecipeId = `
  DELETE FROM ${RECIPE_INGREDIENTS_TABLE}
  WHERE recipe_id = $1
`;
