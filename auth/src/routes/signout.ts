import {Router} from 'express';
const router = Router();

router.post('/api/users/signout', (req, res) => {
  res.send('user signout');
});

export {router as signoutRouter}