import { logger } from "../../config/logger.js";
import { ValidationError } from "../../errors/base.error.js";

const sanitizeBody = (body) => {
  if (!body || typeof body !== "object") return body;

  const sanitized = { ...body };

  if ("password" in sanitized) sanitized.password = "[REDACTED]";
  if ("passwordHash" in sanitized) sanitized.passwordHash = "[REDACTED]";
  if ("refreshToken" in sanitized) sanitized.refreshToken = "[REDACTED]";

  return sanitized;
};

export const errorMiddleware = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  const requestId = req.requestId;


  const requestContext = {
    requestId,
    path: req.originalUrl,
    method: req.method,
    params: req.params,
    query: req.query,
    body: sanitizeBody(req.body),
  };

  

  if (err instanceof ValidationError) {
    const logIssues = err.details.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
      code: issue.code,
    }));

    const clientError = err.details.issues.map((issue) =>({
      field: issue.path.join("."),
      message: issue.message
    }))

    logger.warn("Validation failed", {
      ...requestContext,
      status: 400,
      logIssues,
    });

    return res.status(400).json({
      status: "error",
      message: "Validation error",
      requestId,
      errors: clientError
    });
  }


  const status = err.statusCode || err.status || 500;

  const errorContext = {
    ...requestContext,
    status,
    name: err.name,
    message: err.message,
    details: err.details,
    stack: status >= 500 ? err.stack : undefined,
  };


  if (status >= 500) {
    logger.error("Request failed", errorContext);

    return res.status(status).json({
      status: "error",
      message: "Internal server error",
      requestId,
    });
  }


  logger.warn("Request failed", errorContext);

  return res.status(status).json({
    status: "error",
    message: err.message,
    requestId,
    ...(process.env.NODE_ENV === "development" && err.details
      ? { details: err.details }
      : {}),
  });
};
