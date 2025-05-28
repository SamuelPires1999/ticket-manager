import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidateUserDto } from './dto/validate-user.dto';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(args: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(args.password, 10); // Hash with salt rounds = 10
    return this.prisma.user.create({
      data: {
        email: args.email,
        password: hashedPassword,
        name: args.name,
        document: args.document,
      },
    });
  }

  async findOne(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async validateUser(args: ValidateUserDto): Promise<any> {
    const user = await this.findOne(args.email);
    if (user && (await bcrypt.compare(args.password, user.password))) {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        document: user.document,
      };
    }
    return null;
  }
}
