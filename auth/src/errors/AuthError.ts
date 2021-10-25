import {CustomError} from '@dev_harmattan/common';

export class AuthError extends CustomError {
  status = 401;

  constructor(){
    super('Not authorized');

    Object.setPrototypeOf(this, AuthError.prototype);
  }

  serializeErrors(){
    return [{message: 'Not authorized'}];
  }
}