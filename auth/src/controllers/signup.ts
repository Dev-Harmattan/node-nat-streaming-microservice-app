import {Request, Response} from 'express';
import { validationResult} from 'express-validator';
import {BadRequestError} from '../errors/BadRequestError';
import {RequestValidationError} from '../errors/RequestValidationError';
import {User} from '../models/user';

export const userSignup = async (req: Request, res: Response) => {
  const {email, password} = req.body;

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    throw new RequestValidationError(errors.array());
  }

  const existingUser = await User.findOne({email});
  if(existingUser){
    throw new BadRequestError('Email in use');
  }

  const user = User.build({email, password});
  await user.save()

  res.status(201).json(user);
}
