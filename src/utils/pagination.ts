import { PaginatedResult, PaginationDto } from 'src/global-dtos/pagination.dto';

export const getPrismaPaginationParams = (dto: PaginationDto) => {
  const { page, pageSize } = dto;

  if (page === undefined || pageSize === undefined) {
    return {
      skip: undefined,
      take: undefined,
    };
  }

  // take: pageSize + 1, to see if there are more results.
  return {
    skip: page * pageSize,
    take: pageSize + 1,
  };
};

export const generatePaginatedResult = (
  result: any[],
  paginationDto: PaginationDto,
): PaginatedResult => {
  const { pageSize } = paginationDto;
  const { length: total } = result;

  return {
    data: pageSize && total > pageSize ? result.slice(0, total - 1) : result,
    hasNext: pageSize === undefined ? false : total > pageSize,
  };
};
