import { BaseError } from "../base.error";

export class ForbiddenError extends BaseError {
  constructor(message = "Forbidden"){
    super(message, 403);
  }
};

export class AuthError extends BaseError {
  constructor(message = "Unauthorized"){
    super(message, 401);
  }
};

export class ConflictError extends BaseError {
  constructor(message = "Resource already exists") {
    super(message, 409);
  }
}