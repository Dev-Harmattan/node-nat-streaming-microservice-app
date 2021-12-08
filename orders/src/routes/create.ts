import {Router} from 'express';
import { createOrder } from '../controllers/createContoller';
import {authMiddleware} from '@dev_harmattan/common';
import {body} from 'express-validator';
import mongoose from 'mongoose'

const router = Router();

router.post('/api/orders', authMiddleware, [
  body('ticketId')
  .not()
  .isEmpty()
  .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
  .withMessage('Ticket ID is required')
], createOrder)

export {router as createOrder}