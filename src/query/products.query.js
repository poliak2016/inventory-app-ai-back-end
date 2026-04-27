
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
  INSERT INTO ${PRODUCTS_TABLE} (name, price, quantity)
  VALUES ($1, $2, $3)
  RETURNING ${PRODUCTS_COLUMNS}
`;

export const qUpdateProduct = `
  UPDATE ${PRODUCTS_TABLE}
  SET
    name = $2,
    price = $3,
    quantity = $4,
    category_id = $5,
    updated_at = NOW()
  WHERE id = $1
  RETURNING ${PRODUCTS_COLUMNS}
`;

export const qIncreaseProductQuantity = `
  UPDATE products
  SET quantity = quantity + $2,
    updated_at = NOW()
  WHERE id = $1
  RETURNING *
`;

export const qDecreaseProductQuantity = `
  UPDATE products
  SET quantity = quantity - $2,
      updated_at = NOW()
  WHERE id = $1
    AND quantity >= $2
  RETURNING *
`;

export const qSetProductQuantity = `
  UPDATE products
  SET quantity = $2,
      updated_at = NOW()
  WHERE id = $1
  RETURNING *
`;

export const qDeleteProduct = `
  DELETE FROM ${PRODUCTS_TABLE}
  WHERE id = $1
  RETURNING ${PRODUCTS_COLUMNS}
`;
