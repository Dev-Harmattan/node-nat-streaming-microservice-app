import {Router} from 'express';
const router = Router();
import {currentUser} from '../controllers/currentUser'
import {currentUserMiddleware} from '../middleware/currentUserMiddleware';

router.get('/api/users/currentuser', currentUserMiddleware, currentUser);

export {router as currentUserRouter}