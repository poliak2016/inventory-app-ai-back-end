
export const PRODUCTS_TABLE = "products";

export const PRODUCTS_COLUMNS = `
  id,
  name,
  price,
  quantity,
  category_id AS "categoryId",
  created_at AS "createdAt",
  updated_at AS "updatedAt"
`;

export const qGetAll = `
  SELECT ${PRODUCTS_COLUMNS}
  FROM ${PRODUCTS_TABLE}
  ORDER BY created_at DESC
`;

export const qFindProductById = `
  SELECT ${PRODUCTS_COLUMNS}
  FROM ${PRODUCTS_TABLE}
  WHERE id = $1
  LIMIT 1
`;

export const qCreateProduct = `
  INSERT INTO ${PRODUCTS_TABLE} (name, price, quantity, category_id)
  VALUES ($1, $2, $3, $4)
  RETURNING ${PRODUCTS_COLUMNS}
`;

export const qUpdateProduct = `
  UPDATE ${PRODUCTS_TABLE}
  SET
    name = $2,
    price = $3,
    quantity = $4
    updated_at = NOW()
  WHERE id = $1
  RETURNING ${PRODUCTS_COLUMNS}
`;

export const qDeleteProduct = `
  DELETE FROM ${PRODUCTS_TABLE}
  WHERE id = $1
  RETURNING ${PRODUCTS_COLUMNS}
`;
