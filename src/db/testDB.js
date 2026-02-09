import { query } from "./query.js";
import { logger } from "../config/logger.js"

// const r = await query(`
//   SELECT current_database() as db,
//          current_schema() as schema,
//          inet_server_addr() as server_ip,
//          inet_server_port() as server_port,
//          current_user as db_user
// `);


export const testDB = async () => {
  const connection = await query(`
    SELECT NOW()
    `)
    logger.info("DB connect successful", connection.rows[0].now)
}

