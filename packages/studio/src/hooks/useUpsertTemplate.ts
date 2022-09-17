import { useCallback } from "react";
import { IPostOptions, usePostOne } from "../enthooks/hooks/usePostOne";
import { ITemplate } from "../model";
import { ITemplateInput } from "../model/input";

export function useUpsertTemplate(options?: IPostOptions<any>): [
  (template: ITemplateInput) => void,
  { loading?: boolean; error?: Error }
] {
  const [post, { error, loading }] = usePostOne<ITemplateInput, ITemplate>("Template",
    {
      ...options,
      fieldsGql: "id title device schemaJson"
    }
  )

  const update = useCallback((template: ITemplateInput) => {
    post({
      ...template,
    })
  }, [post]);

  return [update, { error: error, loading: loading }]
}