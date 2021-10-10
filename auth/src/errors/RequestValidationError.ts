import {ValidationError} from 'express-validator';
import { CustomError } from './CustomError';

export class RequestValidationError extends CustomError{
  status = 400;
  constructor(public errors: ValidationError[]){
    super('Invalid user input');
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(){
    return this.errors.map((prop) => ({
      message: prop.msg, field: prop.param
    }));
  }
}



