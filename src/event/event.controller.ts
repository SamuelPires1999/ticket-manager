import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { User } from 'src/auth/user.decorator';
import { AuthenticatedUser } from 'src/auth/authe-user.interface';
import { CreateEventDto } from './dto/create-event.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}
  @Get()
  async getAllEvents() {
    return this.eventService.getAllEvents();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createEvent(
    @Body() input: CreateEventDto,
    @User() user: AuthenticatedUser,
  ) {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException(
        'User does not have permission to create events',
      );
    }

    return this.eventService.createEvent(user, input);
  }
}
