import {Router} from 'express';
import { showAllOrders } from '../controllers/showAllControllers';
import {authMiddleware} from '@dev_harmattan/common'
const router = Router();

router.get('/api/orders', authMiddleware, showAllOrders);

export {router as showAllOrders};