import { logger } from "../config/logger.js";

export const errorMiddleware = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;

  if (res.headersSent) return next(err);

  logger.error("ERROR:", err.message);

  res.status(status).json({
    status: "error",
    message: err.message,
  });
};