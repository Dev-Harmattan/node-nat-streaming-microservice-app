import {
  Subjects,
  Listener,
  TicketUpdatedEventInterface,
} from '@dev_harmattan/common';
import { Message } from 'node-nats-streaming';
import { orderQueueGroupName } from './queueGroupName/orderServiceQueue';
import { Ticket } from '../../models/ticket';

export class TicketUpdatedListener extends Listener<TicketUpdatedEventInterface> {
  readonly subject = Subjects.TicketUpdated;
  queueGroupName = orderQueueGroupName;

  async onMessage(data: TicketUpdatedEventInterface['data'], msg: Message) {
    const { id, title, price } = data;
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      throw new Error('Ticket not found');
    }

    ticket.set({ title, price });
    await ticket.save();

    msg.ack();
  }
}
