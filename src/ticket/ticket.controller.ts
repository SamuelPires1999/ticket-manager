import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AssignTicketDto } from './dto/assign-ticket.dto';
import { AuthenticatedUser } from 'src/auth/authe-user.interface';
import { User } from 'src/auth/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AssignTicketUseCase } from './use-cases/assign-ticket.usecase';

@Controller('tickets')
export class TicketController {
  constructor(private readonly assignTicketUseCase: AssignTicketUseCase) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('assign')
  assignTicket(
    @Body() assignTicketDto: AssignTicketDto,
    @User() user: AuthenticatedUser,
  ) {
    return this.assignTicketUseCase.execute(user, assignTicketDto);
  }
}
