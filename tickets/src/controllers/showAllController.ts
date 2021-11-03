import { Request, Response } from 'express';
import {Ticket} from '../models/ticket';

export const showAllTickets = async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});
  return res.status(200).json(tickets);
}