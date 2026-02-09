export const up = (pgm) => {

  pgm.createExtension("pgcrypto", { ifNotExists: true });


  pgm.alterColumn("users", "id", {
    default: pgm.func("gen_random_uuid()"),
  });
};

export const down = (pgm) => {

  pgm.createExtension("uuid-ossp", { ifNotExists: true });

  pgm.alterColumn("users", "id", {
    default: pgm.func("uuid_generate_v4()"),
  });
};
