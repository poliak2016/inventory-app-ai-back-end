export const SUPPLIERS_TABLE = "suppliers"

export const SUPPLIERS_COLUMNS = `
  id,
  organization_id AS "organizationId",
  name,
  contact_email AS "contactEmail",
  phone_number AS "phoneNumber",
  created_at AS "createdAt",
  updated_at AS "updatedAt"
`
export const qGetAll = `
  SELECT ${SUPPLIERS_COLUMNS}
  FROM ${SUPPLIERS_TABLE}
  WHERE organization_id =$1
  ORDER BY  created_at DESC
`
export const qCreateSuppliers = `
  INSERT  INTO ${SUPPLIERS_TABLE}(
    organization_id,
    name,
    contact_email,
    phone_number
  )
  VALUES($1, $2, $3, $4)
  RETURNING ${SUPPLIERS_COLUMNS}
`