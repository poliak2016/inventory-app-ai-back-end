import pg from "pg";
import { env } from "../config/env.js";
import { logger } from "../config/logger.js";

const { Client } = pg;

if (!env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

const client = new Client({
  connectionString: env.DATABASE_URL,
});

try {
  await client.connect();

  await client.query(`
    DROP SCHEMA public CASCADE;
    CREATE SCHEMA public;
  `);

  logger.info("Test DB reset completed");

} catch (error) {
  logger.error("Failed to reset test DB", error);
} finally {
  await client.end();
}
