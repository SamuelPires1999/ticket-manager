import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(args: SignInDto): Promise<{ access_token: string }> {
    const user = await this.usersService.validateUser({
      email: args.email,
      password: args.password,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(args: SignUpDto): Promise<{ message: string }> {
    const existingUser = await this.usersService.findOne(args.email);
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }
    await this.usersService.create({
      email: args.email,
      password: args.password,
      name: args.name,
      document: args.document,
    });
    return { message: 'User registered successfully' };
  }
}
