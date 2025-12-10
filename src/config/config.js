export default {
  app: {
    name: process.env.APP_NAME || "InventoryAppAI",
    port: Number(process.env.APP_PORT) || 3000,
  },

 
  db: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "inventory_app"
  }
};

