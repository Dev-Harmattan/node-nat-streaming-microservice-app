import { Stan } from "node-nats-streaming";
import { Publisher } from "./PublisherClass";
import { Subjects } from "./SubjectsEnum";
import {TicketCreatedEventInterface} from './TicketCreatedEventInterface';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEventInterface> {
  readonly subject = Subjects.TicketCreated;
}