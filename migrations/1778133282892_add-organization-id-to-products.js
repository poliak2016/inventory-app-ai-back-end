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

  pgm.addColumn("products", {
    organization_id: {
      type: "uuid",
      references: "organization(id)",
      onDelete: "CASCADE"
      }
    }),
  
  pgm.createIndex("products", "organization_id", {
    name: "idx_products_organization_id",
  })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
   pgm.dropIndex("products", "organization_id", {
    name: "idx_products_organization_id",
  });

  pgm.dropColumn("products", "organization_id");
};
