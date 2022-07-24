
export interface IQueryResponse<T> {
  loading?: boolean;
  revalidating?: boolean;
  error?: Error;
  data?: T;
  refresh?: ()=>void;
}
