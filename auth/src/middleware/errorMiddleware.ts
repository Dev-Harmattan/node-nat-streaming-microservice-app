import {Request, Response, NextFunction} from 'express';

export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if(error){
    console.log('Error', error);
  }
  res.status(400).json({error: error.message});
}