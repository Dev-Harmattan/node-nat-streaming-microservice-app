import {ValidationError} from 'express-validator';
class RequestValidationError extends Error {
  constructor(public errors: ValidationError[]){
    super();
    
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}

