import express from 'express';
import {currentUserRouter} from './routes/current-user';
import {signinRouter} from './routes/signin';
import {signoutRouter} from './routes/signout';
import {signupRouter} from './routes/signup';
import {errorMiddleware} from './middleware/errorMiddleware';

const app = express();
app.use(express.json());

//router middleware
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(errorMiddleware);

const PORT = 3000;
app.listen(3000, () => {
  console.log(`Auth running on port: ${PORT}`);
})