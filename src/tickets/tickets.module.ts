import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [TicketsService],
  controllers: [TicketsController],
})
export class TicketsModule {}
