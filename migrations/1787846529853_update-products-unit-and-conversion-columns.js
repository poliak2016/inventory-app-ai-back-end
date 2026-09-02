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
  pgm.sql(`
    ALTER TYPE product_unit ADD VALUE IF NOT EXISTS 'kg';
    ALTER TYPE product_unit ADD VALUE IF NOT EXISTS 'l';
    ALTER TABLE products ALTER COLUMN unit SET DEFAULT 'g';
    ALTER TABLE products ADD COLUMN IF NOT EXISTS avg_weight_grams NUMERIC(10,2), ADD COLUMN IF NOT EXISTS avg_volume_ml NUMERIC(10,2)
    `)
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  // remove added columns and restore default value of products unit 
  // postgres has no DROP VALUE for enums — 'kg'/'l' stay forever once added
  pgm.sql(`
    ALTER TABLE products
    DROP COLUMN IF EXISTS avg_weight_grams,
    DROP COLUMN IF EXISTS avg_volume_ml;
    ALTER TABLE products ALTER COLUMN unit SET DEFAULT 'pcs'
    `)
};
