import express from 'express';
import cookieSession from 'cookie-session';
import 'express-async-errors';
import {errorMiddleware, NotFoundError, currentUserMiddleware} from '@dev_harmattan/common'
import {showOrder} from './routes/show'
import {showAllOrders} from './routes/showAll';
import {createOrder} from './routes/create';
import { deleteOrder } from './routes/delete';



const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test',
}))
app.use(currentUserMiddleware);
//router middleware
app.use(deleteOrder);
app.use(showOrder);
app.use(showAllOrders);
app.use(createOrder);

app.all('*', async () => {
  throw new NotFoundError();
})

app.use(errorMiddleware);

export {app}