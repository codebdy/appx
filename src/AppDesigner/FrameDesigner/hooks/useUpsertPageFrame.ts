import { useCallback } from "react";
import { useDesignerParams } from "~/plugin-sdk/contexts/desinger";
import { IPostOptions, usePostOne } from "~/enthooks/hooks/usePostOne";
import { IUiFrame } from "~/model";
import { IUiFrameInput } from "~/model";
import { GraphQLRequestError } from "~/enthooks";

export function useUpsertPageFrame(options?: IPostOptions<any>): [
  (template: IUiFrameInput) => void,
  { loading?: boolean; error?: GraphQLRequestError }
] {
  const params = useDesignerParams();
  const [post, { error, loading }] = usePostOne<IUiFrameInput, IUiFrame>("PageFrame",
    {
      ...options,
      fieldsGql: "id title device schemaJson"
    }
  )

  const update = useCallback((template: IUiFrameInput) => {
    post({
      device: params.device,
      app: {
        sync: { id: params.app.id }
      },
      ...template,
    })
  }, [params, post]);

  return [update, { error: error, loading: loading }]
}