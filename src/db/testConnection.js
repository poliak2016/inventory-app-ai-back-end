// backend/src/db/testConnection.js
import { pool } from "./pool.js";

export const  testDB = async () => {
  try {
    const res = await pool.query("SELECT NOW()"); 
    console.log("DB connected:", res.rows[0]);  
  } catch (err) {
    console.error("Connection error:", err);
}
};