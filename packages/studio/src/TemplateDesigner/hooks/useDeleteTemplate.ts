import { ID } from "../../shared";
import { IDeleteOptions, useDeleteById } from "../../enthooks/hooks/useDeleteById";
import { ITemplate } from "../../model";

export function useDeleteTemplate(options?: IDeleteOptions<ITemplate>): [
  (id: ID) => void,
  {
    error?: Error,
    loading?: boolean,
  }
] {
  const [doDelete, { error, loading }] = useDeleteById<ITemplate>("Template",
    {
      ...options
    }
  );

  return [doDelete, { error: error, loading: loading }]
}