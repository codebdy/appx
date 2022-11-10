import { useCallback } from "react";
import { usePost } from "~/enthooks";
import { IPostOptions } from "~/enthooks/hooks/usePostOne";
import { CategoryType, ITemplateInfo, ITemplateInfoInput, TemplateType } from "~/model";
import { useDesignerParams } from "~/plugin-sdk/contexts/desinger";

export function useUpsertTemplates(options?: IPostOptions<any>): [
  (templates: ITemplateInfo[], templateType: TemplateType) => void,
  { loading?: boolean; error?: Error }
] {
  const params = useDesignerParams();

  const [post, { error, loading }] = usePost<ITemplateInfoInput, ITemplateInfo>("TemplateInfo",
    {
      ...options,
      fieldsGql: " name"
    }
  )

  const upsert = useCallback((templates: ITemplateInfo[], templateType: TemplateType) => {
    post(templates.map(template => {
      return {
        ...template,
        device: params.device,
        app: {
          sync: { id: params.app.id }
        },
        categoryType: CategoryType.Public,
        templateType,
      }
    }))
  }, [params.app.id, params.device, post]);


  return [upsert, { error: error, loading: loading }]
}