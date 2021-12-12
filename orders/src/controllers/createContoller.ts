import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  RequestValidationError,
} from '@dev_harmattan/common';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';
import {natsWrapper} from '../nats-wrapper';
import {OrderCreatedPublisher} from '../events/publisher/orderCreatedPublisher';

const EXPIRE_WINDOW_TIME = 15 + 60;

export const createOrder = async (req: Request, res: Response) => {
  const { ticketId } = req.body;
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  //find the ticket the user trying to order.
  const ticket = await Ticket.findById(ticketId);
  if (!ticket) {
    throw new NotFoundError();
  }

  //make sure the ticket is not reserved
  const isReserved = await ticket.isReserved();
  if (isReserved) {
    throw new BadRequestError('Ticket has already reserved');
  }

  //calculate the expire date for this order
  const expireTime = new Date();
  expireTime.setSeconds(expireTime.getSeconds() + EXPIRE_WINDOW_TIME);

  //save the order now
  const order = Order.build({
    userId: req.currentUser!.id,
    status: OrderStatus.Created,
    expiresAt: expireTime,
    ticket,
  });
  await order.save();

  new OrderCreatedPublisher(natsWrapper.client).publish({
    id: order.id,
    status: order.status,
    userId: order.userId,
    expiresAt: order.expiresAt.toISOString(),
    ticket: {
      id: ticket.id,
      price: ticket.price
    }

  })

  res.status(201).json({ order });
};
