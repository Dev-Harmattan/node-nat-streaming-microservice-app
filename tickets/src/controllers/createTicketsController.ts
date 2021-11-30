import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {RequestValidationError} from '@dev_harmattan/common';
import {Ticket} from '../models/ticket';
import {TicketCreatedPublisher} from '../events/publishers/ticketCreatedPublisher';
import { natsWrapper } from '../nats-wrapper';

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
  await ticket.save();

  new TicketCreatedPublisher(natsWrapper.client).publish({
    id: ticket.id,
    title: ticket.title,
    price: ticket.price,
    userId: ticket.userId
  })

  res.status(201).json(ticket);
}