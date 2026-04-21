/**
 * @type {import('node-pg-migrate').MigrationBuilder}
 */
export const shorthands = undefined;

export const up = (pgm) => {
  // Ensure legacy `price` column exists for backwards compatibility
  pgm.sql(`
    ALTER TABLE products
      ADD COLUMN IF NOT EXISTS price numeric(10,2) NOT NULL DEFAULT 0;
  `);

  // Add a simple index to speed up range queries on price
  pgm.addIndex('products', ['price']);
};

export const down = (pgm) => {
  pgm.sql(`
    ALTER TABLE products
      DROP COLUMN IF EXISTS price;
  `);

  pgm.dropIndex('products', ['price']);
};
