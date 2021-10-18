import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export const currentUser = (req: Request, res: Response) => {
  res.status(200).json({currentUser: req.currentUser || null});
} 