import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAppParams } from "../../plugin-sdk/contexts/appRoot";
import { IPostOptions, usePostOne } from "../../enthooks/hooks/usePostOne";
import { IPageFrame } from "../../model";
import { IPageFrameInput } from "../../model/input";

export function useUpsertPageFrame(options?: IPostOptions<any>): [
  (template: IPageFrameInput) => void,
  { loading?: boolean; error?: Error }
] {
  const params = useAppParams();
  const [post, { error, loading }] = usePostOne<IPageFrameInput, IPageFrame>("PageFrame",
    {
      ...options,
      fieldsGql: "id title device schemaJson"
    }
  )

  const update = useCallback((template: IPageFrameInput) => {
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