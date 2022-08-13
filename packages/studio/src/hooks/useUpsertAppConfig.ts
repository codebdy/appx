import { useCallback } from "react";
import { IPostOptions, usePostOne } from "../enthooks/hooks/usePostOne";
import { IAppConfig } from "../model";
import { IAppConfigInput } from "../model/input";
import { useAppParams } from "../shared/AppRoot/context";

export function useUpsertAppConfig(options?: IPostOptions<any>): [
  (page: IAppConfigInput) => void,
  { loading?: boolean; error?: Error }
] {
  const params = useAppParams();

  const [post, { error, loading }] = usePostOne<IAppConfigInput, IAppConfig>("AppConfig",
    {
      ...options,
      fieldsGql: " schemaJson"
    }
  )

  const upsert = useCallback((config: IAppConfigInput) => {
    const newConfig = params?.app ? {
      ...config,
      app: {
        sync: { id: params.app.id }
      },
    }
      : config
    post({ ...newConfig })
  }, [params?.app, post]);

  return [upsert, { error: error, loading: loading }]
}