export interface PaginationResult<T> {
    content: T[];
    itemAmount: number;
    pageSize: number;
    currentPage: number;
    pageCount: number;
  }
  