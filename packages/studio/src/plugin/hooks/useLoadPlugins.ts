import { assert } from "console";
import { useCallback } from "react";
import { IPluginInfo } from "../../model";
import { IInstalledPlugin, PluginStatus } from "../model";
import { loadPlugin } from "./load";

export function useLoadPlugins() {
  const load = useCallback(async (pluginInfos: IPluginInfo[]) => {
    const installedPlugins: IInstalledPlugin[] = [];
    for (const pluginInfo of pluginInfos) {
      assert(pluginInfo.url, "Plugin no url");
      try {
        const plugin = await loadPlugin(pluginInfo.url)
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