import {Router} from 'express';
const router = Router();
import { body} from 'express-validator';
import {userSignin} from '../controllers/signin';

router.post('/api/users/signin', [
  body('email')
    .isEmail()
    .withMessage('Required valid email'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('You must supply a password')
],
userSignin);

export {router as signinRouter}