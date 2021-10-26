import express from 'express';
import cookieSession from 'cookie-session';
import 'express-async-errors';
import {errorMiddleware, NotFoundError} from '@dev_harmattan/common'


const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test',
}))

//router middleware


app.all('*', async () => {
  throw new NotFoundError();
})

app.use(errorMiddleware);

export {app}