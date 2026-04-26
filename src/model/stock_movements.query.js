export const STOCK_MOVEMENTS_TABLE = "stock_movements";

export const STOCK_MOVEMENTS_COLUMNS = `
  id,
  product_id,
  organization_id,
  created_by,
  type,
  quantity,
  quantity_before,
  quantity_after,
  note,
  created_at
`;

export const qCreateMovements = `
INSERT INTO stock_movements (
product_id, 
created_by,
type,
quantity,
note
)
VALUES = $1, $2, $3, $4, $5
RETURNING *
`
