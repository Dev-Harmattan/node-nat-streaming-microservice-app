import {Request, Response} from 'express';
import {AuthError, NotFoundError} from '@dev_harmattan/common'
import {Order} from '../models/order';
import mongoose from 'mongoose';

export const showOrder = async (req: Request, res: Response) => {
  const ticketId = new mongoose.Types.ObjectId(req.params.ticketId);

  const order = await Order.findById(ticketId).populate('ticket');

  if(!order) {
    throw new NotFoundError();
  }

  if(order.userId !== req.currentUser!.id){
    throw new AuthError();
  }

  res.status(200).json({order});
}