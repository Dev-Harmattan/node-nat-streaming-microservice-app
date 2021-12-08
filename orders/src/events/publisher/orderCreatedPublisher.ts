import {Publisher, Subjects, OrderCreatedEventInterface} from '@dev_harmattan/common';


export class OrderCreatedPublisher extends Publisher<OrderCreatedEventInterface> {
  readonly subject = Subjects.OrderCreated
}