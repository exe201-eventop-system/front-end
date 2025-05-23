export interface PaginationResult<T> {
  content?: T[];
  itemAmount: number;
  pageSize: number;
  pageCount: number;
  currentPage: number;
}

// Props cho component PaginatedList
export interface PaginatedListProps<T> {
  renderItem: (item: T) => React.ReactNode;
  pageSize?: number;
  fetchData: (params: { page: number; size: number }) => Promise<PaginationResult<T>>;
}