import { Injectable } from '@nestjs/common';
import { Event } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { AuthenticatedUser } from 'src/auth/authe-user.interface';

@Injectable()
export class EventService {
  constructor(private readonly database: PrismaService) {}
  async getAllEvents(): Promise<Event[]> {
    return this.database.event.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createEvent(user: AuthenticatedUser, input: CreateEventDto) {
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
