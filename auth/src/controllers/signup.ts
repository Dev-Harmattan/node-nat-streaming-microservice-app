import {Request, Response} from 'express';
import { validationResult} from 'express-validator';
import jwt from 'jsonwebtoken';
import {BadRequestError, RequestValidationError} from '@dev_harmattan/common';
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

  //sign jsonwebtoken for user
  const userJwt = jwt.sign({id: user._id, email: user.email}, process.env.JWT_KEY!);

  //store userJwt in session
  req.session = {
    jwt: userJwt,
  };


  res.status(201).json(user);
}
