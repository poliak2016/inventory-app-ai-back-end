import {BaseError} from './base.error.js';

export class NotFoundError extends BaseError {
  constructor(resource = "Product") {
    super(`${resource} not found`, 404);
  }
}