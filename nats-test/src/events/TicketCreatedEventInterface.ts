import { Subjects } from "./SubjectsEnum";
export interface TicketCreatedEventInterface {
  subject: Subjects.TicketCreated;
  data: {
    id: string;
    title: string;
    price: number;
  }
}