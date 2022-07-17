import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService, private users: UserService) {}

  async createOne(dto: CreateTicketDto, userId: User['id']) {
    const { price, description, title } = dto;

    const ticket = await this.prisma.ticket.create({
      data: {
        title,
        description,
        price,
        userId,
      },
      select: {
        id: true,
      },
    });

    return ticket;
  }

  async getAll() {
    return await this.prisma.ticket.findMany();
  }
}
