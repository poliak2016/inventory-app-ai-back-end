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
  pgm.createTable("refresh_tokens", {
    id:{
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()")
    },

    user_id:{
      type: "uuid",
      notNull: true,
      references: "users",
      onDelete: "cascade"
    },

    token_hash:{
      type: "text",
      notNull: true
    },

    expires_at:{
      type: "timestamptz",
      notNull: true
    },

    revoked_at: {
      type: "timestamptz",
    },
    created_at: {
      type: "timestamptz",
      default: pgm.func("now()"),
    }
  });
  pgm.addIndex("refresh_tokens", ["user_id"]);
  pgm.addIndex("refresh_tokens", ["token_hash"]);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("refresh_tokens")
};
