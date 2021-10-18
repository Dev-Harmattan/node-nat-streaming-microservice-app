import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { BadRequestError } from '../errors/BadRequestError';
import { RequestValidationError } from '../errors/RequestValidationError';
import { User } from '../models/user';
import { Password } from '../utils/Password';
import jwt from 'jsonwebtoken';

export const userSignin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError('No user register with this email.');
  }

  //compare the user password with hashPassword
  const match = await Password.compare(password, user.password);
  if(!match) {
    throw new BadRequestError('Sorry, your password was incorrect.')
  }

  //sign jsonwebtoken for user
  const userJwt = jwt.sign({id: user._id, email: user.email}, process.env.JWT_KEY!);

  //store userJwt in session
  req.session = {
    jwt: userJwt,
  };


  res.status(200).json(user);
};
