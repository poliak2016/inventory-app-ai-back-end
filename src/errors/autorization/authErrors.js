import { BaseError } from "../base.error.js";

export class AuthError extends BaseError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

export class InvalidCredentialsError extends BaseError {
  constructor() {
    super("Invalid email or password", 401);
  }
}

export class TokenMissingError extends BaseError {
  constructor() {
    super("Refresh token missing", 401);
  }
}

export class TokenReuseDetectedError extends BaseError {
  constructor() {
    super("Refresh token reuse detected", 401);
  }
}

export class InvalidTokenError extends BaseError {
  constructor(message = "Invalid refresh token") {
    super(message, 401);
  }
}