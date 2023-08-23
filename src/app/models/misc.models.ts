export interface IPaginatedResourcePage<T> {
  page: number;
  data: T;
  nextPage?: number;
  previousPage?: number;
}

export interface IPaginatedResource<T> {
  pages: IPaginatedResourcePage<T>[];
  totalItems: number;
}
