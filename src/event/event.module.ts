import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CreateEventUseCase } from './use-cases/create-event.usecase';
import { GetAllEventsUseCase } from './use-cases/get-all-events.usecase';

@Module({
  controllers: [EventController],
  providers: [CreateEventUseCase, GetAllEventsUseCase],
  imports: [PrismaModule],
})
export class EventModule {}
