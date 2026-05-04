export const STOCK_MOVEMENTS_TABLE = "stock_movements";

export const STOCK_MOVEMENTS_COLUMNS = `
  id,
  product_id,
  created_by,
  type,
  quantity,
  quantity_before,
  quantity_after,
  note,
  created_at
`;

export const qCreateMovements = `
INSERT INTO ${STOCK_MOVEMENTS_TABLE} (
  product_id,
  created_by,
  type,
  quantity,
  quantity_before,
  quantity_after,
  note
)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING ${STOCK_MOVEMENTS_COLUMNS};
`;

export const qGetMovementsByProductId = `
SELECT
  ${STOCK_MOVEMENTS_COLUMNS}
FROM ${STOCK_MOVEMENTS_TABLE}
WHERE product_id = $1
ORDER BY created_at DESC
LIMIT $2 OFFSET $3;
`;
