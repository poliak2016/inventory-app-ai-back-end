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
  pgm.createTable('categories', {
    id:{
      type: 'uuid',
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()")
    },
    name:{
      type: 'text',
      notNull: true,
    },
    slug:{
      type: 'text',
      notNull: true,
    },
    description:{ 
      type: "text" 
      },
     parent_id: {
      type: "uuid",
      references: '"categories"',
      onDelete: "SET NULL",
    },

    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("now()"),
    },

    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("now()"),
    },
  });

  pgm.addConstraint("categories", "categories_slug_unique", {
    unique: ["slug"],
  });

};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = () => {};
