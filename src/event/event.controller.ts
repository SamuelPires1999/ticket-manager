import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/auth/user.decorator';
import { AuthenticatedUser } from 'src/auth/authe-user.interface';
import { CreateEventDto } from './dto/create-event.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetAllEventsUseCase } from './use-cases/get-all-events.usecase';
import { CreateEventUseCase } from './use-cases/create-event.usecase';

@Controller('events')
export class EventController {
  constructor(
    private readonly getAllEventsUseCase: GetAllEventsUseCase,
    private readonly createEventUseCase: CreateEventUseCase,
  ) {}
  @Get()
  async getAllEvents() {
    return this.getAllEventsUseCase.execute();
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

    return this.createEventUseCase.execute(user, input);
  }
}
