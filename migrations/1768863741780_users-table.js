export const shorthands = undefined;

export const up = (pgm) => {
  
  pgm.createExtension("pgcrypto", { ifNotExists: true });

  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    name: {
      type: "text",
      notNull: true,
    },
    email: {
      type: "text",
      notNull: true,
      unique: true,
    },
    password_hash: {
      type: "text",
      notNull: true,
    },
    role: {
      type: "text",
      notNull: true,
      default: "user",
    },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("now()"),
    },
  });

  pgm.createIndex("users", "created_at");
};

export const down = (pgm) => {
  pgm.dropTable("users", { ifExists: true });
  // (опційно) extension не видаляють, бо може бути потрібен іншим таблицям
};
