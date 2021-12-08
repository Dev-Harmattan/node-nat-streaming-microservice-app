import {Router} from 'express';
import { showOrder } from '../controllers/showController';
import {authMiddleware} from '@dev_harmattan/common'
const router = Router();


router.get('/api/orders/:orderId', authMiddleware, showOrder);

export {router as showOrder} 