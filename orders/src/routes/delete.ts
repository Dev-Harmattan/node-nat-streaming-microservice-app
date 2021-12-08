import {Router} from 'express';
import { deleteOrder } from '../controllers/deleteContoller';
import {authMiddleware} from '@dev_harmattan/common'
const router = Router();

router.delete('/api/orders/:orderId', authMiddleware, deleteOrder);

export {router as deleteOrder}