import {
  BaseError
} from './base.error.js';

export class NotFoundError extends BaseError {
  constructor(resource = "Resource") {
    super(`${resource} not found`, 404);
  }
}