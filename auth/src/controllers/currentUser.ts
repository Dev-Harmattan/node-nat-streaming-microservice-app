import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export const currentUser = (req: Request, res: Response) => {
  if(!req.session?.jwt){
    return res.status(401).json({currentUser: null});
  }

  try {
    const payload = jwt.verify(req.session?.jwt, process.env.JWT_KEY!);
    res.status(200).json({currentUser: payload});
  } catch (error) {
    res.status(401).json({currentUser: null});
  } 
} 