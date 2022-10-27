import { useCallback } from "react";
import { useDesignerParams } from "~/plugin-sdk/contexts/desinger";
import { IPluginInfo, PluginType } from "~/model";
import { IInstalledPlugin, PluginStatus } from "../model";
import { useGetPluginInfo } from "./useGetPluginInfo";
import { loadDebugPlugin, loadPlugin } from "./useLoadPlugin";

export function useLoadPlugins() {
  const { app } = useDesignerParams();
  
  const getPlugInfo = useGetPluginInfo();
  const load = useCallback(async (pluginInfos: IPluginInfo[]) => {
    const installedPlugins: IInstalledPlugin[] = [];
    for (const pluginInfo of pluginInfos) {
      console.assert(pluginInfo.url, "Plugin no url");
      try {
        const plugin = pluginInfo.type === PluginType.debug
          ? await loadDebugPlugin(pluginInfo.url)
          : await loadPlugin(pluginInfo.url)

        installedPlugins.push({
          pluginInfo: {
            ...getPlugInfo(plugin, pluginInfo.url, pluginInfo.type),
            ...pluginInfo || {},
          },
          plugin,
          status: PluginStatus.Normal
        })
      } catch (error) {
        installedPlugins.push({
          pluginInfo: {
            ...pluginInfo || {},
            app: app,
            url: pluginInfo.url,
            type: pluginInfo.type
          },
          status: PluginStatus.Error
        })
      }
    }

    return installedPlugins;
  }, [])

  return load;
}