import { useCallback } from "react";
import { IPostOptions, usePostOne } from "~/enthooks/hooks/usePostOne";
import { IPluginInfo } from "~/model";
import { IPluginInfoInput } from "~/model";
import { useAppParams } from "@rxdrag/plugin-sdk/contexts/appRoot";

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
      app: {
        sync: {
          id: params?.app?.id,
        }
      },
    }
    post(newInfo)
  }, [params?.app, post]);

  return [upsert, { error: error, loading: loading }]
}