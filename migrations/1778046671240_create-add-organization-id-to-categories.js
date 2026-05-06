/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.addColumn("categories", {
    organization_id: {
      type: "uuid",
      notNull: true,
      references: "organizations(id)",
      onDelete: "cascade",
    },
  });

  pgm.createIndex("categories", ["organization_id"]);
  pgm.createConstraint(
    "categories",
    "categories_organization_name_unique",
    "UNIQUE (organization_id, name)"
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropConstraint("categories", "categories_organization_name_unique");
  pgm.dropIndex("categories", ["organization_id"]);
  pgm.dropColumn("categories", "organization_id");
};
