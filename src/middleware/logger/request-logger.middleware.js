import {logger} from "../../config/logger.js";

export const requestLogger = (req, res, next) => {
  logger.info("Incoming request", {
    requestId: req.requestId,
    method: req.method,
    path: req.originalUrl,
  });
  next();
}