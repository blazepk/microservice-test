import {Publisher , Subjects , TicketUpdatedEvent } from '@ticket-template/common';

export class TicketUpdatedPunlisher extends Publisher<TicketUpdatedEvent>{
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated; 
}
