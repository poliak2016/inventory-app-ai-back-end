/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
export const up = (pgm) => {
  // create enum type for product unit if not exists
  pgm.sql(`DO $$
  BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'product_unit') THEN
      CREATE TYPE product_unit AS ENUM ('g','ml','pcs');
    END IF;
  END$$;`);

  // remove legacy price column if present, and add new columns
  // keep existing `price` column for backwards compatibility
  pgm.sql(`ALTER TABLE products
    ADD COLUMN IF NOT EXISTS unit product_unit NOT NULL DEFAULT 'pcs',
    ADD COLUMN IF NOT EXISTS min_stock integer NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS organization_id uuid;`);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
export const down = (pgm) => {
  // restore price column (best-effort) and remove added columns & type
  pgm.sql(`ALTER TABLE products
    DROP COLUMN IF EXISTS unit,
    DROP COLUMN IF EXISTS min_stock,
    DROP COLUMN IF EXISTS organization_id;`);

  pgm.sql(`DROP TYPE IF EXISTS product_unit;`);
};
