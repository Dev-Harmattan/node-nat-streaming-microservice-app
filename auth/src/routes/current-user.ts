import {Router} from 'express';
const router = Router();
import {currentUser} from '../controllers/currentUser'

router.get('/api/users/currentuser', currentUser);

export {router as currentUserRouter}