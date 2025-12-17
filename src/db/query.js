import { pool } from "./pool.js";

export const query = (text, params) => pool.query(text, params);