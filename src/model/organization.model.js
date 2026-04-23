export const ORGANIZATIONS_TABLE = "organizations";

export const ORGANIZATIONS_COLUMNS = `
id,
name,
created_at,
updated_at
`;

export const qCreate = `
INSERT INTO ${ORGANIZATIONS_TABLE} (name)
VALUES ($1)
RETURNING ${ORGANIZATIONS_COLUMNS};
`;