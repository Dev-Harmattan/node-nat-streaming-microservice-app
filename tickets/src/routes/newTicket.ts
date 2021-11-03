import express from 'express';
import { createTicket } from '../controllers/createTicketsController';
import {authMiddleware, } from '@dev_harmattan/common'
import {body} from 'express-validator'
const router = express.Router();

router.post('/api/tickets', authMiddleware, [
  body('title')
    .not()
    .isEmpty()
    .withMessage('Required title'),
  body('price')
  .isFloat({gt: 0})
  .withMessage('Price must greater than Zero')
], createTicket);

export {router as createTicketRouter}