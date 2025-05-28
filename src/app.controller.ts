import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './auth/user.decorator';
import { AuthenticatedUser } from './auth/authe-user.interface';

@Controller()
export class AppController {
  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  protectedRoute(@User() user: AuthenticatedUser) {
    return {
      message: 'This route is protected',
      loggedUser: user,
    };
  }
}
