import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, EventModule, TicketModule],
  controllers: [AppController],
})
export class AppModule {}
