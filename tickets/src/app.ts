import express from 'express';
import cookieSession from 'cookie-session';
import 'express-async-errors';
import {createTicketRouter} from './routes/newTicket'
import {errorMiddleware, NotFoundError, currentUserMiddleware} from '@dev_harmattan/common'
import { showTicketRouter } from './routes/show';
import { showAllTicketRouter } from './routes/showAll';
import {updateTicketRouter} from './routes/updateTicket'


const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test',
}))
app.use(currentUserMiddleware);
//router middleware
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(showAllTicketRouter)
app.use(updateTicketRouter);

app.all('*', async () => {
  throw new NotFoundError();
})

app.use(errorMiddleware);

export {app}