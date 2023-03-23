import {Publisher , Subjects , TicketCreatedEvent } from '@ticket-template/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
  subject: Subjects.TicketCreated = Subjects.TicketCreated; 
}
