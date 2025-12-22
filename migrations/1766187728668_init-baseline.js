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

  pgm.createExtension('uuid-ossp', {ifNotExists: true});

  pgm.createTable('products', {
    id:{
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuid_generate_v4()'),
    },
    name:{
      type: 'text',
      notNull: true,
    },
    price:{
      type: 'numeric(10,2)',
      notNull: true,
    },
    quantity:{
      type: 'integer',
      notNull: true,
    },
    created_at:{
      type: 'timestamptz',
      notNull: true,
      default: pgm.func('now()'),
    },
  });

  pgm.createIndex('products', 'created_at')
};


export const down = (pgm) => {
  pgm.dropTable('products', { ifExists: true });
  pgm.dropExtension('uuid-ossp', { ifExists: true });
};
