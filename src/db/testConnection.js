// backend/src/db/testConnection.js
import { pool } from "./index.js";

export const  testDB = async () => {
  try {
    const res = await pool.query("SELECT NOW()"); // ✅ use await
    console.log("DB connected:", res.rows[0]);    // { now: '2025-12-12T...' }
  } catch (err) {
    console.error("Connection error:", err);
  } finally {
    await pool.end();
  }
}
