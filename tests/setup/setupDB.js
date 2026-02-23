import { env } from "../../src/config/env.js";
import { logger } from "../../src/config/logger.js";
import { execSync } from "child_process";
import { query} from "../../src/db/query.js"; 

const setupDB = async () => {
  if (!env.DATABASE_URL?.includes("_test")) {
    throw new Error("You are trying to reset a non-test database!");
  }

  try {
    await query("DROP SCHEMA IF EXISTS public CASCADE;");
    await query("CREATE SCHEMA public;");

    
    execSync("npm run migrate:test", { stdio: "inherit" });
  } catch (err) {
   
    logger.error(err);
    throw new Error("Impossible to reset test database");
  }
};

export default setupDB;