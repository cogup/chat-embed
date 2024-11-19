export interface Meta {
  limit: number;
  offset: number;
  page: number;
  totalPages: number;
  totalItems: number;
}

export interface ResponseList<T> {
  data: T[];
  meta: Meta;
}
