import { useCallback } from "react";
import { useEdittingAppUuid } from "../../hooks/useEdittingAppUuid";
import { IPostOptions, usePostOne } from "../../enthooks/hooks/usePostOne";
import { IMenuAuthConfig, IMenuAuthConfigInput } from "../../model";

export function useUpsertMenuAuthConfig(options?: IPostOptions<any>): [
  (config: IMenuAuthConfigInput) => void,
  { loading?: boolean; error?: Error }
] {
  const appUuid = useEdittingAppUuid()
  const [post, { error, loading }] = usePostOne<IMenuAuthConfigInput, IMenuAuthConfig>("MenuAuthConfig",
    options
  )

  const upsert = useCallback((config: IMenuAuthConfigInput) => {
    post({ ...config, appUuid })
  }, [post, appUuid]);


  return [upsert, { error, loading }]
}