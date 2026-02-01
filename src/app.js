import express from "express";
import healthRoutes from "./routes/health.routes.js";
import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { errorMiddleware } from "./middleware/error/error.middleware.js";
import { requestLogger } from "./middleware/logger/request-logger.middleware.js";

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use("/health", healthRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

app.use(errorMiddleware);

export default app;
