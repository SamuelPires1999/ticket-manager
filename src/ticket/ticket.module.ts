import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AssignTicketUseCase } from './use-cases/assign-ticket.usecase';

@Module({
  providers: [AssignTicketUseCase],
  controllers: [TicketController],
  imports: [PrismaModule],
})
export class TicketModule {}
