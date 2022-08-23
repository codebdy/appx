import { useCallback } from "react";
import { IPostOptions, usePostOne } from "../enthooks/hooks/usePostOne";
import { IAppDeviceConfig } from "../model";
import { IAppDeviceConfigInput } from "../model/input";
import { useAppParams } from "../shared/AppRoot/context";

export function useUpsertAppDeviceConfig(options?: IPostOptions<any>): [
  (config: IAppDeviceConfigInput) => void,
  { loading?: boolean; error?: Error }
] {
  const params = useAppParams();

  const [post, { error, loading }] = usePostOne<IAppDeviceConfigInput, IAppDeviceConfig>("AppDeviceConfig",
    {
      ...options,
      fieldsGql: " device appUuid schemaJson"
    }
  )

  const upsert = useCallback((config: IAppDeviceConfigInput) => {
    const newConfig = {
      ...config,
      appUuid: params.app.uuid,
    }
    post({ ...newConfig })
  }, [params?.app, post]);

  return [upsert, { error: error, loading: loading }]
}