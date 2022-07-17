import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @IsOptional()
  @Min(0)
  page?: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  pageSize?: number;
}

export class PaginatedResult {
  data: any[];
  hasNext: boolean;
}
