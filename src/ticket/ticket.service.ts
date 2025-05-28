import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AssignTicketDto } from './dto/assign-ticket.dto';
import { AuthenticatedUser } from 'src/auth/authe-user.interface';

@Injectable()
export class TicketService {
  constructor(private readonly database: PrismaService) {}

  async assignTicket(user: AuthenticatedUser, input: AssignTicketDto) {
    const event = await this.database.event.findUnique({
      where: {
        id: input.eventId,
      },
      select: {
        id: true,
        maxAttendees: true,
      },
    });
    const soldEventTickets = await this.database.ticket.count({
      where: {
        eventId: input.eventId,
      },
    });
    if (soldEventTickets === event.maxAttendees) {
      throw new UnprocessableEntityException('Event is sold out');
    }

    const newTicket = await this.database.ticket.create({
      data: {
        eventId: input.eventId,
        userId: user.id,
        ownerName: input.ownerName || user.name,
        ownewDocument: input.ownerDocument || user.document,
      },
    });

    return {
      message: 'Ticket assigned successfully',
      ticketId: newTicket.id,
      userId: user.id,
      eventId: newTicket.eventId,
      ownerName: newTicket.ownerName || user.name,
      ownerDocument: newTicket.ownewDocument || user.document,
    };
  }
}
