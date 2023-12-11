export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    last_page: number;
    current_page: number;
    per_page: number;
    prev: string | number | null;
    next: string | number | null;
  };
}
