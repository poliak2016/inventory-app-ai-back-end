export class BaseError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends BaseError {
  constructor(resource = "Resource") {
    super(`${resource} not found`, 404);
  }
}

export class ValidationError extends BaseError {
  constructor(message = "Validation error", details = null) {
    super(message, 400, details);
  }
}

export class ConflictError extends BaseError {
  constructor(message = "Resource already exists") {
    super(message, 409);
  }
}