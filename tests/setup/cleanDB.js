import { query } from "../../src/db/query.js"; 

export const cleanDB = async() => {
  await query(`
    DO $$
    DECLARE 
      r RECORD;
    BEGIN 
      FOR r IN (SELECT tablename FROM pg_tables WHERE  schemaname = 'public' AND tablename !=  'pgmigrations')
      LOOP
        EXECUTE ' TRUNCATE TABLE ' || quote_ident(r.tablename) || ' RESTART IDENTITY CASCADE';
      END LOOP;
    END$$;
    `)
};


