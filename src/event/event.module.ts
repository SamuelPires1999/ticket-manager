import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [EventController],
  providers: [EventService],
  imports: [PrismaModule],
})
export class EventModule {}
