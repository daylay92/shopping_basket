export class PaginationResult {
  total: number;
  pageSize?: number;
  pageNumber?: number;
}

export class PaginatedResponse<T> {
  pagination: PaginationResult;
  data: T[];
}
