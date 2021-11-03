import { Router } from "express";
import {updateTicket} from '../controllers/updateTicketController';
import {authMiddleware} from '@dev_harmattan/common';
import {body} from 'express-validator';
const router = Router();


  router.put('/api/tickets/:id',  authMiddleware, [
    body('title')
      .not()
      .isEmpty()
      .withMessage('Required title'),
    body('price')
    .isFloat({gt: 0})
    .withMessage('Price must greater than Zero')
  ], updateTicket);

export {router as updateTicketRouter}