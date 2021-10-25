import {Router} from 'express';
const router = Router();
import {currentUser} from '../controllers/currentUser';
import {currentUserMiddleware, authMiddleware} from '@dev_harmattan/common';


router.get('/api/users/currentuser', currentUserMiddleware, authMiddleware, currentUser);

export {router as currentUserRouter}