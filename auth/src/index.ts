import express from 'express';
import {currentUserRouter} from './routes/current-user';

const app = express();
app.use(express.json());

app.use(currentUserRouter);

const PORT = 3000;
app.listen(3000, () => {
  console.log(`Auth running on port: ${PORT}`);
})