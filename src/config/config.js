import dotenv from "dotenv"
import path from"node:path"

dotenv.config({
  path: process.env.NODE_ENV === "test" 
  ? path.resolve(process.cwd(), ".env.test")
  : path.resolve(process.cwd(), ".env") 
});

if (!process.env.DB_PASSWORD) {
  throw new Error("DB_PASSWORD is missing");
}

const config = {
  app: {
    name: process.env.APP_NAME || "InventoryAppAI",
    port: Number(process.env.APP_PORT) || 3000,
  },

  db: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "inventory_app"
  }
};

export default config;
