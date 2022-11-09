import { useCallback } from "react";
import { IPostOptions, usePostOne } from "~/enthooks/hooks/usePostOne";
import { ITemplateInfo, ITemplateInfoInput } from "~/model";
import { useDesignerParams } from "~/plugin-sdk/contexts/desinger";

export function useUpsertTemplate(options?: IPostOptions<any>): [
  (template: ITemplateInfoInput) => void,
  { loading?: boolean; error?: Error }
] {
  const params = useDesignerParams();

  const [post, { error, loading }] = usePostOne<ITemplateInfoInput, ITemplateInfo>("TemplateInfo",
    {
      ...options,
      fieldsGql: " name"
    }
  )

  const upsert = useCallback((page: ITemplateInfoInput) => {
    post({
      ...page,
      device: params.device,
      app: {
        sync: { id: params.app.id }
      },
    })
  }, [params.app.id, params.device, post]);


  return [upsert, { error: error, loading: loading }]
}