import { logger } from "../config/logger.js";

export const errorMiddleware = (err, req, res, next) => {
  
  const status = err.statusCode || err.status || 500;

  if (res.headersSent) return next(err);

  const logPayLoad = {
    message: err.message,
    status,
    path: req.originalUrl,
    method: req.method
  }

  if(status >= 500){
    logger.error("Internal server error",{
      ...logPayLoad,
      stack: err.stack
    })
  } else {
      logger.warn("Client error:", logPayLoad)
    }

  res.status(status).json({
    status: "error",
    message: err.message,
  });
};
