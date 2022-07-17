import { Optional } from '@nestjs/common';
import { IsNumber, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  title: string;

  @IsString()
  @Optional()
  description: string;

  @IsNumber()
  price: number;
}
