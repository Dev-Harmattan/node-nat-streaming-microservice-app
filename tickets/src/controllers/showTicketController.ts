import { Request, Response } from "express";
import { Ticket } from "../models/ticket";
import {NotFoundError} from '@dev_harmattan/common';

export const showTicket = async (req: Request, res: Response) => {
  const id = req.params.id;

  const ticket = await Ticket.findById(id);
  if(!ticket) {
    throw new NotFoundError()
  }

  res.status(200).json(ticket);
}
