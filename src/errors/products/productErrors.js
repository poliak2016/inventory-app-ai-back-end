import {BaseError} from '../base.error.js';

export class NotFoundError extends BaseError {
  constructor(resource = "Product") {
    super(`${resource} Not Found`, 404);
  }
};

export class ValidationError extends BaseError {
  constructor(message = "Validation error", details = null) {
    super(message, 400);
    this.details = details;
  }
}