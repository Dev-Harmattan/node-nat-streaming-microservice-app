import {Request, Response, NextFunction} from 'express';
import {AuthError} from '../errors/AuthError'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if(!req.currentUser){
    throw new AuthError()
  }

  next();
}