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
    UPDATE users
    SET role = 'user'
    WHERE role IS NULL;
  `);

  pgm.alterColumn("users", "role", {
    notNull: true,
    default: "user",
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.alterColumn("users", "role", {
    notNull: false,
    default: null
  })

  pgm.sql(`
    UPDATE users
    SET role = NULL
    WHERE role = 'user';
  `);
};
