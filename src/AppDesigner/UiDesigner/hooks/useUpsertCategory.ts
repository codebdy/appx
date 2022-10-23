import { useCallback } from "react";
import { IPostOptions, usePostOne } from "~/enthooks/hooks/usePostOne";
import { IPageCategoryInput } from "~/model";
import { IPageCategory } from "~/model";
import { useAppParams } from "@rxdrag/plugin-sdk/contexts/appRoot";

export function useUpsertCategory(options?: IPostOptions<any>): [
  (category: IPageCategoryInput) => void,
  { loading?: boolean; error?: Error }
] {
  const params = useAppParams();

  const [post, { error, loading }] = usePostOne<IPageCategoryInput, IPageCategory>("PageCategory",
    {
      ...options,
      fieldsGql: " title"
    }
  )

  const upsert = useCallback((page: IPageCategoryInput) => {
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