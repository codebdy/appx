import { ID } from "~/shared";
import { IDeleteOptions, useDeleteById } from "~/enthooks/hooks/useDeleteById";
import { IPage } from "~/model";

export function useDeletePage(options?: IDeleteOptions<IPage>): [
  (id: ID) => void,
  {
    error?: Error,
    loading?: boolean,
  }
] {
  const [doDelete, { error, loading }] = useDeleteById<IPage>("Page",
    {
      ...options
    }
  );

  return [doDelete, { error: error, loading: loading }]
}