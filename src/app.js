import express from "express";
import healthRoutes from "./routes/health.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();

app.use(express.json());

app.use("/health", healthRoutes);
app.use("/api/products", productRoutes);

export default app;
