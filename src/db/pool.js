import pkg from "pg";
const {Pool} = pkg;
import config from "../config/config.js"

export const pool = new Pool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});
