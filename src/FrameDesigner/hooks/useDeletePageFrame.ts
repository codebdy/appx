import { ID } from "../../shared";
import { IDeleteOptions, useDeleteById } from "../../enthooks/hooks/useDeleteById";
import { IPageFrame } from "../../model";

export function useDeletePageFrame(options?: IDeleteOptions<IPageFrame>): [
  (id: ID) => void,
  {
    error?: Error,
    loading?: boolean,
  }
] {
  const [doDelete, { error, loading }] = useDeleteById<IPageFrame>("PageFrame",
    {
      ...options
    }
  );

  return [doDelete, { error: error, loading: loading }]
}