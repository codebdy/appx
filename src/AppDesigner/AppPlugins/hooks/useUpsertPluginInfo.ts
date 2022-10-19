import { useCallback } from "react";
import { IPostOptions, usePostOne } from "../../enthooks/hooks/usePostOne";
import { IPluginInfo } from "../../model";
import { IPluginInfoInput } from "../../model/input";
import { useAppParams } from "../../plugin-sdk/contexts/appRoot";

export function useUpsertPluginInfo(options?: IPostOptions<any>): [
  (pluginInfo: IPluginInfoInput) => void,
  { loading?: boolean; error?: Error }
] {
  const params = useAppParams();

  const [post, { error, loading }] = usePostOne<IPluginInfoInput, IPluginInfo>("PluginInfo",
    {
      ...options
    }
  )

  const upsert = useCallback((pluginInfo: IPluginInfoInput) => {
    const newInfo = {
      ...pluginInfo,
      appUuid: params?.app?.uuid,
    }
    post(newInfo)
  }, [params?.app, post]);

  return [upsert, { error: error, loading: loading }]
}