import { CustomError } from './CustomError';

export class DatabaseConnectionErrors extends CustomError {
  reason = 'Error connecting to database';
  status = 500;
  constructor(){
    super('Error database connecting');
  
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, DatabaseConnectionErrors.prototype);
  }

  serializeErrors(){
    return [
      {message: this.reason} 
    ]
  }
}

