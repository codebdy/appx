import { ID } from "~/shared";
import { IDeleteOptions, useDeleteById } from "~/enthooks/hooks/useDeleteById";
import { IUiFrame } from "~/model";

export function useDeletePageFrame(options?: IDeleteOptions<IUiFrame>): [
  (id: ID) => void,
  {
    error?: Error,
    loading?: boolean,
  }
] {
  const [doDelete, { error, loading }] = useDeleteById<IUiFrame>("PageFrame",
    {
      ...options
    }
  );

  return [doDelete, { error: error, loading: loading }]
}