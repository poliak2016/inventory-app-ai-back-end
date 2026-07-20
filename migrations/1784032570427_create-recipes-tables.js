/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
export const up = (pgm) => {
  pgm.createTable('recipes', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()"),
    },
    organization_id: {
      type: 'uuid',
      notNull: true,
      references: 'organizations(id)',
      onDelete: 'cascade',
    },
    category_id: {
      type: 'uuid',
      references: 'categories(id)',
      onDelete: 'set null',
    },
    name: {
      type: 'text',
      notNull: true,
    },
    instructions: {
      type: 'text',
    },
    yield_weight: {
      type: 'numeric(10,2)',
    },
    yield_unit: {
      type: 'product_unit',
      notNull: true,
      default: 'g',
    },
    portions: {
      type: 'integer',
    },
    sale_price: {
      type: 'numeric(10,2)',
    },
    photo_url: {
      type: 'text',
    },
    created_at: {
      type: 'timestamptz',
      notNull: true,
      default: pgm.func("now()"),
    },
    updated_at: {
      type: 'timestamptz',
      notNull: true,
      default: pgm.func("now()"),
    },
  });

  pgm.createIndex('recipes', ['organization_id']);
  pgm.createIndex('recipes', ['category_id']);

  pgm.sql(`CREATE TABLE recipe_ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    quantity NUMERIC(10,2) NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );
  CREATE INDEX idx_recipe_ingredients_recipe_id ON recipe_ingredients(recipe_id);
  CREATE INDEX idx_recipe_ingredients_product_id ON recipe_ingredients(product_id);`);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
export const down = (pgm) => {
  pgm.sql(`DROP TABLE IF EXISTS recipe_ingredients;`);
  pgm.dropTable('recipes');
};
