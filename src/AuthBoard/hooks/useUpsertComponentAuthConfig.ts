import { useCallback } from "react";
import { useEdittingAppUuid } from "../../hooks/useEdittingAppUuid";
import { IPostOptions, usePostOne } from "../../enthooks/hooks/usePostOne";
import { IComponentAuthConfig, IComponentAuthConfigIput } from "../../model";

export function useUpsertComponentAuthConfig(options?: IPostOptions<any>): [
  (config: IComponentAuthConfigIput) => void,
  { loading?: boolean; error?: Error }
] {
  const appUuid = useEdittingAppUuid()
  const [post, { error, loading }] = usePostOne<IComponentAuthConfigIput, IComponentAuthConfig>("ComponentAuthConfig",
    options
  )

  const upsert = useCallback((config: IComponentAuthConfigIput) => {
    post({ ...config, appUuid })
  }, [post, appUuid]);


  return [upsert, { error, loading }]
}