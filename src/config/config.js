export default {
  app: {
    name: process.env.APP_NAME || "InventoryAppAI",
    port: Number(process.env.PORT) || 3000,
  }
};
