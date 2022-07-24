
export interface IMutationResponse<T> {
  loading?: boolean;
  error?: Error;
  data?: T;
}
