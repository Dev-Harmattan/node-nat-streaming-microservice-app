import nats from 'node-nats-streaming';
import {TicketCreatedPublisher} from './events/TicketCreatedPublisherClass'
import {randomBytes} from 'crypto';
const clientID = randomBytes(4).toString('hex');

console.clear();

const stan = nats.connect('ticketing', clientID, {
  url: 'http://localhost:4222',
});
stan.on('connect', async () => {
  console.log('Stan connection established');

  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: '1234',
      title: 'show',
      price: 30
    });
  } catch (error) {
    console.log(error);
  }
});
