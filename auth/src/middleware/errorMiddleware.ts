import {Request, Response, NextFunction, response} from 'express';
import { CustomError } from '../errors/CustomError';

export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {

  if(error instanceof CustomError){
    return res.status(error.status).json({errors: error.serializeErrors()});
  }

  res.status(400).json({error: [{message: 'somthing went wrong'}]})
}