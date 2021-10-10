import {Router} from 'express';
import { body} from 'express-validator';
import {userSignup} from '../controllers/signup';
const router = Router();

router.post('/api/users/signup', [
  body('email')
    .isEmail()
    .withMessage('Required valid email'),
  body('password')
    .trim()
    .isLength({min: 4, max: 20})
    .withMessage('Password lenght must be at least 4 or up to 20 characters')
], userSignup);

export {router as signupRouter}