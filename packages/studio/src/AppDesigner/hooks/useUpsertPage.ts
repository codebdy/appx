import { useCallback } from "react";
import { IPostOptions, usePostOne } from "../../enthooks/hooks/usePostOne";
import { IPageInput } from "../../model/input";
import { IPage } from "../../model";
import { useDesignerParams } from "../context";
import { ID } from "../../shared";

export function useUpsertPage(options?: IPostOptions<any>): [
  (page: IPageInput, categoryUuid?: string) => void,
  { loading?: boolean; error?: Error }
] {
  const params = useDesignerParams();

  const [post, { error, loading }] = usePostOne<IPageInput, IPage>("Page",
    {
      ...options,
      fieldsGql: "id title"
    }
  )

  const upsert = useCallback((page: IPageInput, categoryId?: ID) => {
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