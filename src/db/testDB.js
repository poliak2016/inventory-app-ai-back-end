import { query } from "./query.js";

export const testDB = async () => {
  const connection = await query(`
    SELECT NOW()
    `)
    console.log("DB connect successful", connection.rows[0].now)
}