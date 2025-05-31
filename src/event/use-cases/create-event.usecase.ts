import { AuthenticatedUser } from 'src/auth/authe-user.interface';
import { CreateEventDto } from '../dto/create-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';

export class CreateEventUseCase {
  constructor(private readonly database: PrismaService) {}
  async execute(user: AuthenticatedUser, input: CreateEventDto) {
    const { title, description, date, location, maxattendees } = input;
    return this.database.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        location,
        maxAttendees: maxattendees,
        organizerId: user.id,
      },
    });
  }
}
