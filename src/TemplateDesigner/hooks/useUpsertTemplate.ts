import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { IPostOptions, usePostOne } from "../../enthooks/hooks/usePostOne";
import { ITemplate } from "../../model";
import { ITemplateInput } from "../../model/input";

export function useUpsertTemplate(options?: IPostOptions<any>): [
  (template: ITemplateInput) => void,
  { loading?: boolean; error?: Error }
] {
  const { device } = useParams();
  const [post, { error, loading }] = usePostOne<ITemplateInput, ITemplate>("Template",
    {
      ...options,
      fieldsGql: "id title device schemaJson"
    }
  )

  const update = useCallback((template: ITemplateInput) => {
    post({
      device: device as any,
      ...template,
    })
  }, [device, post]);

  return [update, { error: error, loading: loading }]
}