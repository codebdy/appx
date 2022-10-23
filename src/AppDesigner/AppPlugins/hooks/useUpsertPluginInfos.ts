import { useCallback } from "react";
import { usePost } from "~/enthooks/hooks/usePost";
import { IPostOptions } from "~/enthooks/hooks/usePostOne";
import { IPluginInfo, IPluginInfoInput } from "~/model";
import { useAppParams } from "@rxdrag/plugin-sdk/contexts/appRoot";

export function useUpsertPluginInfos(options?: IPostOptions<any>): [
  (pluginInfos: IPluginInfoInput[]) => void,
  { loading?: boolean; error?: Error }
] {
  const params = useAppParams();

  const [post, { error, loading }] = usePost<IPluginInfoInput, IPluginInfo>("PluginInfo",
    {
      ...options
    }
  )

  const upsert = useCallback((pluginInfos: IPluginInfoInput[]) => {
    const newInfos = pluginInfos.map(pluginInfo => {
      return {
        ...pluginInfo,
        app: {
          sync: {
            id: params?.app?.id
          }
        },
      }
    })
    post(newInfos)
  }, [params?.app, post]);

  return [upsert, { error: error, loading: loading }]
}