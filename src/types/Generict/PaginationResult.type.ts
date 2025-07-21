export interface PaginationResult<T> {
  content: T[];
  item_amount: number;
  page_size: number;
  current_page: number;
  page_count: number;
}
