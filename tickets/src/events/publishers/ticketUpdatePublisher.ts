import {Publisher, Subjects, TicketUpdatedEventInterface} from '@dev_harmattan/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEventInterface> {
  readonly subject = Subjects.TicketUpdated;
}