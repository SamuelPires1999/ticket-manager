import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GetAllEventsUseCase {
  constructor(private readonly database: PrismaService) {}
  async execute() {
    return await this.database.event.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
