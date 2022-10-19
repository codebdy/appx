import { useCallback } from "react";
import { useEdittingAppUuid } from "../../hooks/useEdittingAppUuid";
import { IPostOptions, usePostOne } from "../../enthooks/hooks/usePostOne";
import { IClassAuthConfig, IClassAuthConfigInput } from "../../model";

export function useUpsertClassAuthConfig(options?: IPostOptions<any>): [
  (config: IClassAuthConfigInput) => void,
  { loading?: boolean; error?: Error }
] {
  const appUuid = useEdittingAppUuid()
  const [post, { error, loading }] = usePostOne<IClassAuthConfigInput, IClassAuthConfig>("ClassAuthConfig",
    options
  )

  const upsert = useCallback((config: IClassAuthConfigInput) => {
    post({ ...config, appUuid })
  }, [post, appUuid]);


  return [upsert, { error, loading }]
}