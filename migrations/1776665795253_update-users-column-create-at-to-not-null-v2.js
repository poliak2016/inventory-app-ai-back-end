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
    UPDATE "users"
    SET updated_at = now()
    WHERE updated_at IS NULL
    `)

  pgm.alterColumn("users", "updated_at", {
    notNull: true,
    default: pgm.func("now()")
  })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.alterColumn("users", "updated_at", {
  notNull: false,
  default: null
})};
