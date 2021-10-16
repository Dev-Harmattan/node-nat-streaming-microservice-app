import {CustomError} from './CustomError';

export class BadRequestError extends CustomError {
  status = 409;
  constructor(public message: string){
    super(message);

    //explicitly set the properties
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors(){
    return [{message: this.message}];
  }
}