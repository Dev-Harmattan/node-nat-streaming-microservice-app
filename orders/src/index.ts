import {app} from './app';
import mongoose from 'mongoose';
import {natsWrapper} from './nats-wrapper';
import {randomBytes} from 'crypto';

const startListen = async () => {
  if(!process.env.JWT_KEY){
    throw new Error('JWT key must be specified');
  }

  if(!process.env.MONGO_URI){
    throw new Error('MONGO URI must be specified');
  }

  if(!process.env.NATS_CLIENT_ID){
    throw new Error('NATS_CLIENT_ID must be specified');
  }

  if(!process.env.NATS_CLUSTER_ID){
    throw new Error('NATS_CLUSTER_ID must be specified');
  }

  if(!process.env.NATS_URL){
    throw new Error('NATS_URL must be specified');
  }

  try {
    //nats client connection
    await natsWrapper.connection(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);

    //gracefully terminated nats client connection
    natsWrapper.client.on('close', () => {
      console.log('Nats connection closed');
      process.exit();
    })
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Orders database connnected');
  } catch (error) {
    console.error(error);
  }

  const PORT = 3000;
  app.listen(3000, () => {
    console.log(`Orders running on port: ${PORT}`);
  })
}

startListen();





