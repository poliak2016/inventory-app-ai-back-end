import { logger } from "../config/logger.js";
import{ZodError} from "zod";

export const errorMiddleware = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  if(err instanceof ZodError){
    res.status(400).json({
      status: "error",
      message: "Validation error",
      issues: err.issues.map((i) => ({
      path: i.path.join("."),
      message: i.message
      }))
    })
  }
  
  const status = err.statusCode || err.status || 500;

  const logPayload = {
    requestId: req.requestId,
    message: err.message,
    status,
    path: req.originalUrl,
    method: req.method,
  };


  if (status >= 500) {
    logger.error("Request failed", { ...logPayload, stack: err.stack });
    return res.status(status).json({
      status: "error",
      message: "Internal server error",
      requestId: req.requestId,
    });
  }

  logger.warn("Request failed", logPayload);
  return res.status(status).json({
    status: "error",
    message: err.message,
    requestId: req.requestId,
  });
};
