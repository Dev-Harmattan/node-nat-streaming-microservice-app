import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {RequestValidationError} from '@dev_harmattan/common';
import {Ticket} from '../models/ticket';

export const createTicket = async (req: Request, res: Response) => {
  const {title, price} = req.body;

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    throw new RequestValidationError(errors.array())
  }

  const ticket = Ticket.build({
    title,
    price,
    userId: req.currentUser!.id
  })
  await ticket.save()
  res.status(201).json(ticket);
}