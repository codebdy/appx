import { useCallback } from "react";
import { IPostOptions, usePostOne } from "../../enthooks/hooks/usePostOne";
import { IMenuInput, IPageInput } from "../../model/input";
import { IMenu } from "../../model";
import { useAppParams } from "../../shared/AppRoot/context";

export function useUpsertMenu(options?: IPostOptions<any>): [
  (page: IPageInput) => void,
  { loading?: boolean; error?: Error }
] {
  const params = useAppParams();

  const [post, { error, loading }] = usePostOne<IMenuInput, IMenu>("Menu",
    {
      ...options,
      fieldsGql: " schemaJson"
    }
  )

  const upsert = useCallback((menu: IMenuInput) => {
    post({
      ...menu,
      device: params.device,
      app: {
        sync: { id: params.app.id }
      },
    })
  }, [params.app.id, params.device, post]);

  return [upsert, { error: error, loading: loading }]
}