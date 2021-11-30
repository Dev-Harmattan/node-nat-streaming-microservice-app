import {Publisher, Subjects, TicketCreatedEventInterface} from '@dev_harmattan/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEventInterface> {
  readonly subject = Subjects.TicketCreated;
}