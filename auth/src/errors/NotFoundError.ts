import {CustomError} from '@dev_harmattan/common';

export class NotFoundError extends CustomError {
  status = 404;

  constructor(){
    super('Not Found');

    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializeErrors(){
    return [
      {message: 'Not Found'} 
    ]
  }
}