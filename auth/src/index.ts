import {app} from './app';
import mongoose from 'mongoose';

const startListen = async () => {
  if(!process.env.JWT_KEY){
    throw new Error('JWT key must be specified');
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017');
    console.log('Database connnected');
  } catch (error) {
    console.error(error);
  }

  const PORT = 3000;
  app.listen(3000, () => {
    console.log(`Auth running on port: ${PORT}`);
  })
}

startListen();

