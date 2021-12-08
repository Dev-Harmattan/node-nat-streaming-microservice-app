import {Publisher, Subjects, OrderCancelledEventInterface} from '@dev_harmattan/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEventInterface> {
  readonly subject = Subjects.OrderCancelled;
}