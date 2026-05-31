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
  sm.id,
  sm.product_id,
  sm.created_by,
  sm.type,
  sm.quantity,
  sm.quantity_before,
  sm.quantity_after,
  sm.note,
  sm.created_at
FROM stock_movements sm
JOIN products p ON sm.product_id = p.id
WHERE sm.product_id = $1 AND p.organization_id = $2
ORDER BY sm.created_at DESC
LIMIT $3 OFFSET $4;
`;
