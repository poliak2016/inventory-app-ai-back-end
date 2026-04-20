export const ORGANIZATION_TABLE = "organizations";

export const ORGANIZATION_COLUMNS = `
id,
name, 
created_at as "createdAt",
`

export const qGetAll = `
SELECT ${ORGANIZATION_COLUMNS}
FROM ${ORGANIZATION_TABLE} 
ORDER BY createdAt DESC
`