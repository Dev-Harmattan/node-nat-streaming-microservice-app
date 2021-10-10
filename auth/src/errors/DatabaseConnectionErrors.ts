class DatabaseConnectionErrors extends Error {
  reason = 'Error connecting to database';
  constructor(){
    super();


    // Set the prototype explicitly.
    Object.setPrototypeOf(this, DatabaseConnectionErrors.prototype);
  }
}