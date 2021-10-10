import {Request, Response} from 'express';
import { validationResult} from 'express-validator';

export const userSignup = (req: Request, res: Response) => {
  const {email, password} = req.body;

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    throw new Error('Invalid input');
  }

  console.log('Creating new user');
  throw new Error('Something went wrong');

  res.send({});
}
