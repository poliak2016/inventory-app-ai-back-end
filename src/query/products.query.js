export const PRODUCTS_TABLE = "products";

export const PRODUCTS_COLUMNS = `
  id,
  name,
  price,
  quantity,
  organization_id,
  category_id AS "categoryId",
  created_at AS "createdAt",
  updated_at AS "updatedAt"
`;

export const qGetAll = `
  SELECT ${PRODUCTS_COLUMNS}
  FROM ${PRODUCTS_TABLE}
  WHERE organization_id = $1
  ORDER BY created_at DESC
`;

export const qFindProductById = `
  SELECT ${PRODUCTS_COLUMNS}
  FROM ${PRODUCTS_TABLE}
  WHERE organization_id = $1
    AND id = $2
  LIMIT 1
`;

export const qCreateProduct = `
  INSERT INTO ${PRODUCTS_TABLE} (
    name,
    price,
    quantity,
    category_id,
    organization_id
  )
  VALUES ($1, $2, $3, $4, $5)
  RETURNING ${PRODUCTS_COLUMNS}
`;

export const qUpdateProduct = `
  UPDATE ${PRODUCTS_TABLE}
  SET
    name = $3,
    price = $4,
    quantity = $5,
    category_id = $6,
    updated_at = NOW()
  WHERE organization_id = $1
    AND id = $2
  RETURNING ${PRODUCTS_COLUMNS}
`;

export const qIncreaseProductQuantity = `
  UPDATE ${PRODUCTS_TABLE}
  SET
    quantity = quantity + $3,
    updated_at = NOW()
  WHERE organization_id = $1
    AND id = $2
  RETURNING *
`;

export const qDecreaseProductQuantity = `
  UPDATE ${PRODUCTS_TABLE}
  SET
    quantity = quantity - $3,
    updated_at = NOW()
  WHERE organization_id = $1
    AND id = $2
    AND quantity >= $3
  RETURNING *
`;

export const qSetProductQuantity = `
  UPDATE ${PRODUCTS_TABLE}
  SET
    quantity = $3,
    updated_at = NOW()
  WHERE organization_id = $1
    AND id = $2
  RETURNING *
`;

export const qDeleteProduct = `
  DELETE FROM ${PRODUCTS_TABLE}
  WHERE organization_id = $1
    AND id = $2
  RETURNING ${PRODUCTS_COLUMNS}
`;