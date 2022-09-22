import { useCallback } from "react";
import { IPluginInfo, PluginType } from "../../model";
import { IInstalledPlugin, PluginStatus } from "../model";
import { loadDebugPlugin, loadPlugin } from "./useLoadPlugin";

export function useLoadPlugins() {
  const load = useCallback(async (pluginInfos: IPluginInfo[]) => {
    const installedPlugins: IInstalledPlugin[] = [];
    for (const pluginInfo of pluginInfos) {
      console.assert(pluginInfo.url, "Plugin no url");
      try {
        const plugin = pluginInfo.type === PluginType.debug
          ? await loadDebugPlugin(pluginInfo.url)
          : await loadPlugin(pluginInfo.url)

        installedPlugins.push({
          pluginInfo,
          plugin,
          status: PluginStatus.Normal
        })
      } catch (error) {
        installedPlugins.push({
          pluginInfo,
          status: PluginStatus.Error
        })
      }
    }

    return installedPlugins;
  }, [])

  return load;
}