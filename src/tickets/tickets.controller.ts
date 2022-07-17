import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateTicketDto } from './dto/create-ticket.dto';
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
  getAllTickets() {
    return this.tickets.getAll();
  }
}
