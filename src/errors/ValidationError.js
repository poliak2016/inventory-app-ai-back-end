import {BaseError} from './base.error.js';;

export class ValidationError extends BaseError {
  constructor(message = "Validation Error") {
    super(message, 400,);
  }
}