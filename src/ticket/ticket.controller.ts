import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { AssignTicketDto } from './dto/assign-ticket.dto';
import { AuthenticatedUser } from 'src/auth/authe-user.interface';
import { User } from 'src/auth/user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('assign')
  assignTicket(
    @Body() assignTicketDto: AssignTicketDto,
    @User() user: AuthenticatedUser,
  ) {
    return this.ticketService.assignTicket(user, assignTicketDto);
  }
}
