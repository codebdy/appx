import { useCallback } from "react";
import { IPostOptions, usePostOne } from "../enthooks/hooks/usePostOne";
import { IAppConfig } from "../model";
import { IAppConfigInput } from "../model/input";
import { useAppParams } from "@rxdrag/plugin-sdk/contexts/appRoot";

export function useUpsertAppConfig(options?: IPostOptions<any>): [
  (config: IAppConfigInput) => void,
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
    const newConfig = {
      ...config,
      appUuid: params.app.uuid,
    }
    post({ ...newConfig })
  }, [params?.app, post]);

  return [upsert, { error: error, loading: loading }]
}