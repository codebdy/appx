import { useCallback } from "react";
import { usePost } from "../../enthooks/hooks/usePost";
import { IPostOptions } from "../../enthooks/hooks/usePostOne";
import { IPluginInfo } from "../../model";
import { IPluginInfoInput } from "../../model/input";
import { useAppParams } from "../../plugin-sdk/contexts/appRoot";

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
    const newInfos  = pluginInfos.map(pluginInfo=>{
      return {
        ...pluginInfo,
        appUuid: params?.app?.uuid,
      }
    }) 
    post(newInfos)
  }, [params?.app, post]);

  return [upsert, { error: error, loading: loading }]
}