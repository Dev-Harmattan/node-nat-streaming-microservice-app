import {app} from './app';
import mongoose from 'mongoose';

const startListen = async () => {
  if(!process.env.JWT_KEY){
    throw new Error('JWT key must be specified');
  }

  if(!process.env.MONGO_URI){
    throw new Error('MONGO URI must be specified');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Tickets database connnected');
  } catch (error) {
    console.error(error);
  }

  const PORT = 3000;
  app.listen(3000, () => {
    console.log(`tickets running on port: ${PORT}`);
  })
}

startListen();

