import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Ticket, User } from '@prisma/client';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { GetAllTicketsDto } from './dto/get-all-tickets.dto';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private tickets: TicketsService) {}

  @UseGuards(JwtGuard)
  @Post('')
  createTicket(
    @GetUser('id') userId: User['id'],
    @Body() dto: CreateTicketDto,
  ) {
    return this.tickets.createOne(dto, userId);
  }

  @Get()
  getAllTickets(@Body() dto: GetAllTicketsDto) {
    return this.tickets.getAll(dto);
  }

  @Get(':id')
  getById(@Param('id') id: Ticket['id']) {
    return this.tickets.getById(id);
  }
}
