export const CATEGORY_TABLE = "categories";

export const CATEGORY_COLUMNS = `
	id,
	name,
	slug,
	description,
	parent_id AS "parentId",
	created_at AS "createdAt",
	updated_at AS "updatedAt"
`;

export const qGetAll = `
SELECT ${CATEGORY_COLUMNS}
FROM ${CATEGORY_TABLE}
ORDER BY created_at DESC
`;
