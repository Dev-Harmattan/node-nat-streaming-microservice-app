import {Router} from 'express';
const router = Router();
import {currentUser} from '../controllers/currentUser'
import {currentUserMiddleware} from '../middleware/currentUserMiddleware';
import {authMiddleware} from '../middleware/authMiddleware'

router.get('/api/users/currentuser', currentUserMiddleware, authMiddleware, currentUser);

export {router as currentUserRouter}