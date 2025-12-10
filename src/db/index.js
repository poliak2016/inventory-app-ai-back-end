import pkg from "pg";
const {Pool} = pkg;

export const pool = new Pool({
  user: "postrges",
  host: "localhost",
  database: "inventory_app",
  password: "qwerty",
  port: 5432
})