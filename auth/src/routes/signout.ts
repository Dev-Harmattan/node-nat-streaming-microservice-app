import {Router} from 'express';
import { signout } from '../controllers/signout';
const router = Router();

router.post('/api/users/signout', signout);

export {router as signoutRouter}