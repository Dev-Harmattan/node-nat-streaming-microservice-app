import nats from 'node-nats-streaming';
import {TicketCreatedListener }from './events/TicketCreatedListenerClass'
import {randomBytes} from 'crypto';
const clientID = randomBytes(4).toString('hex');

console.clear();

const stan = nats.connect('ticketing', clientID, {
  url: 'http://localhost:4222'
})

stan.on('close', () => {
  console.log('Stan close');
  process.exit();
})

stan.on('connect', () => {
  new TicketCreatedListener(stan).listen();
})

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());




