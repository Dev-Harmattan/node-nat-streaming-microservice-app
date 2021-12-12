import {Message} from 'node-nats-streaming';
import {Subjects, Listener, TicketCreatedEventInterface, TicketUpdatedEventInterface} from '@dev_harmattan/common';
import {Ticket} from '../../models/ticket';
import {orderQueueGroupName} from './queueGroupName/orderServiceQueue';

export class TicketCreatedListener extends Listener<TicketCreatedEventInterface> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = orderQueueGroupName;

  async onMessage(data: TicketUpdatedEventInterface['data'], msg: Message){
    const {id, title, price} = data;
    const ticket = Ticket.build({id,title, price});
    await ticket.save();

    msg.ack();
  }
}