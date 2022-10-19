import { useCallback } from "react";
import { useEdittingAppUuid } from "~/hooks/useEdittingAppUuid";
import { IPostOptions, usePostOne } from "~/enthooks/hooks/usePostOne";
import { IPropertyAuthConfig, IPropertyAuthConfigInput } from "model";

export function useUpsertPropertyAuthConfig(options?: IPostOptions<any>): [
  (config: IPropertyAuthConfigInput) => void,
  { loading?: boolean; error?: Error }
] {
  const appUuid = useEdittingAppUuid()
  const [post, { error, loading }] = usePostOne<IPropertyAuthConfigInput, IPropertyAuthConfig>("PropertyAuthConfig",
    options
  )

  const upsert = useCallback((config: IPropertyAuthConfigInput) => {
    post({ ...config, appUuid })
  }, [post, appUuid]);


  return [upsert, { error, loading }]
}