import {Request, Response} from 'express';
import {Order, OrderStatus} from'../models/order';
import {NotFoundError, AuthError} from '@dev_harmattan/common';

export const deleteOrder = async (req: Request, res: Response) => {
  const {orderId} = req.params;

  const order = await Order.findById(orderId);
  if(!order){
    throw new NotFoundError()
  }

  if(order.userId !== req.currentUser!.id){
    throw new AuthError()
  }

  order.status = OrderStatus.Cancelled;
  await order.save();

  res.status(204).json({order});
}