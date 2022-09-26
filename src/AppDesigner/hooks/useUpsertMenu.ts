import { useCallback } from "react";
import { IPostOptions, usePostOne } from "../../enthooks/hooks/usePostOne";
import { IMenuInput } from "../../model/input";
import { IMenu } from "../../model";
import { useAppParams } from "../../plugin-sdk/contexts/appRoot";

export function useUpsertMenu(options?: IPostOptions<any>): [
  (menu: IMenuInput) => void,
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