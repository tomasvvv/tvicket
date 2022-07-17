import { Injectable } from '@nestjs/common';
import { Ticket, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  generatePaginatedResult,
  getPrismaPaginationParams,
} from 'src/utils/pagination';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { GetAllTicketsDto } from './dto/get-all-tickets.dto';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

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

  async getAll(dto: GetAllTicketsDto) {
    const { filters = {} } = dto;
    const result = await this.prisma.ticket.findMany({
      ...getPrismaPaginationParams(dto),
      where: {
        ...filters,
      },
    });

    return generatePaginatedResult(result, dto);
  }

  async getById(id: Ticket['id']) {
    return await this.prisma.ticket.findUnique({ where: { id } });
  }
}
