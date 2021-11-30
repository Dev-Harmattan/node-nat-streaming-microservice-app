import { Request, Response } from "express";
import {Ticket} from '../models/ticket';
import {validationResult} from 'express-validator';
import {TicketUpdatedPublisher} from '../events/publishers/ticketUpdatePublisher';
import {natsWrapper} from '../nats-wrapper';

import {NotFoundError, AuthError, RequestValidationError, BadRequestError} from '@dev_harmattan/common'

export const updateTicket = async (req: Request, res: Response) => {
  const id = req.params.id;

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    throw new RequestValidationError(errors.array())
  }

  const ticket = await Ticket.findById(id);
  if(!ticket){
    throw new NotFoundError();
  }

  if(ticket.userId !== req.currentUser!.id){
    throw new AuthError();
  }

  ticket.title = req.body.title;
  ticket.price = req.body.price;
  await ticket.save()

  new TicketUpdatedPublisher(natsWrapper.client).publish({
    id: ticket.id,
    title: ticket.title,
    price: ticket.price,
    userId: ticket.userId
  })

  

  res.status(201).json(ticket)
}
