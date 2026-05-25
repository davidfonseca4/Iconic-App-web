export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const normalizePagination = (query: PaginationQuery): { page: number; limit: number; offset: number } => {
  const page = Math.max(1, query.page ?? 1);
  const limit = Math.max(1, Math.min(100, query.limit ?? 12));
  const offset = (page - 1) * limit;
  return { page, limit, offset };
};

export const createPaginationMeta = (page: number, limit: number, total: number): PaginationMeta => ({
  page,
  limit,
  total,
  totalPages: Math.ceil(total / limit)
});
