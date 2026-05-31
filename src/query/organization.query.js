export const ORGANIZATIONS_TABLE = "organizations";

export const ORGANIZATIONS_COLUMNS = `
  id,
  name,
  created_at AS "createdAt",
  updated_at AS "updatedAt"
`;

export const qCreate = `
INSERT INTO ${ORGANIZATIONS_TABLE} (name)
VALUES ($1)
RETURNING ${ORGANIZATIONS_COLUMNS};
`;

export const qGetOrganizationById = `
SELECT ${ORGANIZATIONS_COLUMNS}
FROM ${ORGANIZATIONS_TABLE}
WHERE id = $1
`;

export const qUpdateOrganization = `
UPDATE ${ORGANIZATIONS_TABLE}
SET name = $1, updated_at = NOW()
WHERE id = $2
RETURNING ${ORGANIZATIONS_COLUMNS}
`;
