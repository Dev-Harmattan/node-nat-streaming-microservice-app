import {Request, Response} from 'express';
import {Order} from '../models/order'

export const showAllOrders = async (req: Request, res: Response) => {
  const order = await Order.find({
    userId: req.currentUser!.id
  }).populate('ticket')
  return res.status(200).json({order});
}