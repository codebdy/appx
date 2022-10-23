import { useCallback } from "react";
import { IPostOptions, usePostOne } from "~/enthooks/hooks/usePostOne";
import { IPageInput } from "~/model";
import { IPage } from "~/model";
import { useAppParams } from "@rxdrag/plugin-sdk/contexts/appRoot";

export function useUpsertPage(options?: IPostOptions<any>): [
  (page: IPageInput) => void,
  { loading?: boolean; error?: Error }
] {
  const params = useAppParams();

  const [post, { error, loading }] = usePostOne<IPageInput, IPage>("Page",
    {
      ...options,
      fieldsGql: " title"
    }
  )

  const upsert = useCallback((page: IPageInput) => {
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