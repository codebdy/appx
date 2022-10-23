import { useEffect, useState } from "react";
import { IInstalledPlugin } from "../model";
import { useLoadPlugins } from "./useLoadPlugins";
import { useQueryPluginInfos } from "./useQueryPluginInfos";

export function useIntalledPlugins(appId: string) {
  const [installedPlugins, setInstalledPlugins] = useState<IInstalledPlugin[]>([])
  const { data, error, loading } = useQueryPluginInfos(appId);

  const load = useLoadPlugins();

  useEffect(() => {
    load(data?.pluginInfos?.nodes || []).then((plugins) => {
      setInstalledPlugins(plugins);
    })

  }, [data, load])

  return { plugins: installedPlugins, error, loading }
}