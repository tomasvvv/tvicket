import { Type } from 'class-transformer';
import { IsObject, IsOptional, IsUUID } from 'class-validator';
import { PaginationDto } from 'src/global-dtos/pagination.dto';

class GetAllTicketsFilterDto {
  @IsUUID()
  @IsOptional()
  userId: string;
}

export class GetAllTicketsDto extends PaginationDto {
  @IsOptional()
  @IsObject()
  @Type(() => GetAllTicketsFilterDto)
  filters: GetAllTicketsFilterDto;
}
