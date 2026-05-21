// src/models/user.query.js

export const USER_TABLE = "users";

export const USER_COLUMNS = `
  id,
  email,
  role,
  organization_id,
  name,
  created_at AS "createdAt",
  updated_at AS "updatedAt"
`;

export const USER_PRIVATE_COLUMNS = `
  ${USER_COLUMNS},
  password_hash AS "passwordHash"
`;

export const qGetUser = `
SELECT ${USER_COLUMNS}
FROM ${USER_TABLE}
WHERE id = $1
ORDER BY created_at DESC
`

export const qFindById = `
  SELECT ${USER_COLUMNS}
  FROM ${USER_TABLE}
  WHERE id = $1
  LIMIT 1
`;

export const qFindByEmail = `
  SELECT ${USER_PRIVATE_COLUMNS}
  FROM ${USER_TABLE}
  WHERE email = $1
  LIMIT 1
`;

export const qCreate = `
  INSERT INTO ${USER_TABLE} (name, email, password_hash, role, organization_id)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING ${USER_COLUMNS}
`;

export const qGetAll = `
  SELECT ${USER_COLUMNS}
  FROM ${USER_TABLE}
  WHERE organization_id = $1
  ORDER BY created_at DESC
  LIMIT $2
  OFFSET $3
`;