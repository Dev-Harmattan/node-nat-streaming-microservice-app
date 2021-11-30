import { Message } from "node-nats-streaming";
import { Listener } from "./ListenerClass";
import {TicketCreatedEventInterface} from './TicketCreatedEventInterface';
import { Subjects } from "./SubjectsEnum";

//ticket listener class
export class TicketCreatedListener extends Listener<TicketCreatedEventInterface> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = 'payments-service';
  onMessage(data: TicketCreatedEventInterface['data'], msg: Message){
    console.log('Event data!', data);
    msg.ack();
  }
}
