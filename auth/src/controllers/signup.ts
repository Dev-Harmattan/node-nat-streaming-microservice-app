import {Request, Response} from 'express';
import { validationResult} from 'express-validator';
import {DatabaseConnectionErrors} from '../errors/DatabaseConnectionErrors';
import {RequestValidationError} from '../errors/RequestValidationError';
export const userSignup = async (req: Request, res: Response) => {
  const {email, password} = req.body;

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    throw new RequestValidationError(errors.array());
  }

  throw new DatabaseConnectionErrors();

  res.send({});
}
