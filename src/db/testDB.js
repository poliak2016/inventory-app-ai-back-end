import { query } from "./query.js";
import {logger} from "../config/logger.js"

export const testDB = async () => {
  const connection = await query(`
    SELECT NOW()
    `)
    logger.info("DB connect successful", connection.rows[0].now)
}