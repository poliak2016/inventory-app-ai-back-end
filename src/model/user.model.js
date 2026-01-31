// src/models/user.model.js

export const USER_TABLE = "users";

export const USER_COLUMNS = `
  id,
  email,
  role,
  created_at AS "createdAt",
  updated_at AS "updatedAt"
`;

export const USER_PRIVATE_COLUMNS = `
  ${USER_COLUMNS},
  password_hash AS "passwordHash"
`;

export const qFindById = `
  SELECT ${USER_PRIVATE_COLUMNS}
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
  INSERT INTO ${USER_TABLE} (email, password_hash, role)
  VALUES ($1, $2, $3)
  RETURNING ${USER_COLUMNS}
`;
