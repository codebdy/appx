import { useCallback } from "react";
import { IPostOptions, usePostOne } from "~/enthooks/hooks/usePostOne";
import { IMenuInput } from "~/model";
import { IMenu } from "~/model";
import { useDesignerParams } from "~/plugin-sdk/contexts/desinger";

export function useUpsertMenu(options?: IPostOptions<any>): [
  (menu: IMenuInput) => void,
  { loading?: boolean; error?: Error }
] {
  const params = useDesignerParams();

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