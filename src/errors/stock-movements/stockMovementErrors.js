import { BaseError } from '../base.error.js';

export class StockMovementNotFoundError extends BaseError {
  constructor(resource = 'Product') {
    super(`${resource} not found`, 404);
  }
}

export class InsufficientStockError extends BaseError {
  constructor() {
    super('Insufficient stock for this operation', 422);
  }
}

export class InvalidMovementTypeError extends BaseError {
  constructor() {
    super('Invalid movement type', 400);
  }
}
