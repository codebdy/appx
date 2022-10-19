import { ID } from "~/shared";
import { IDeleteOptions, useDeleteById } from "~/enthooks/hooks/useDeleteById";
import { IPageCategory } from "~/model";

export function useDeleteCategory(options?: IDeleteOptions<IPageCategory>): [
  (id: ID) => void,
  {
    error?: Error,
    loading?: boolean,
  }
] {
  const [doDelete, { error, loading }] = useDeleteById<IPageCategory>("PageCategory",
    {
      ...options
    }
  );

  return [doDelete, { error: error, loading: loading }]
}