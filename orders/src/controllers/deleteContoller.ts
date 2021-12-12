import {Request, Response} from 'express';
import {Order, OrderStatus} from'../models/order';
import {NotFoundError, AuthError} from '@dev_harmattan/common';
import {natsWrapper} from '../nats-wrapper';
import {OrderCancelledPublisher} from '../events/publisher/orderCancelledPublisher';

export const deleteOrder = async (req: Request, res: Response) => {
  const {orderId} = req.params;

  const order = await Order.findById(orderId).populate('ticket');
  if(!order){
    throw new NotFoundError()
  }

  if(order.userId !== req.currentUser!.id){
    throw new AuthError()
  }

  order.status = OrderStatus.Cancelled;
  await order.save();

  new OrderCancelledPublisher(natsWrapper.client).publish({
    id: order.id,
    ticket: {
      id: order.ticket.id
    }
  })

  res.status(204).json({order});
}