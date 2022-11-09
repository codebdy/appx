import { ID } from "~/shared";
import { IDeleteOptions, useDeleteById } from "~/enthooks/hooks/useDeleteById";
import { ITemplateInfo } from "~/model";

export function useDeleteTemplate(options?: IDeleteOptions<ITemplateInfo>): [
  (id: ID) => void,
  {
    error?: Error,
    loading?: boolean,
  }
] {
  const [doDelete, { error, loading }] = useDeleteById<ITemplateInfo>("TemplateInfo",
    {
      ...options
    }
  );

  return [doDelete, { error: error, loading: loading }]
}