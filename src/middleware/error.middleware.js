import { logger } from "../config/logger.js";

export const errorMiddleware = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;

  if (res.headersSent) return next(err);

    logger.error("Request error", {
    message: err.message,
    status,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
  });

  res.status(status).json({
    status: "error",
    message: err.message,
  });
};