import { IPlugin, useGetPluginLocalMessage } from "..";
import { useCallback } from "react";
import { IInstalledPlugin, PluginType } from "../../shared/AppRoot/context";

export function useGetInstalledPlugin() {
  const { getTitle } = useGetPluginLocalMessage();
  const get = useCallback((plugin: IPlugin): IInstalledPlugin => {
    return {
      pluginInfo: {
        id: plugin.id,
        appUuid: "",
        pluginId: plugin.id,
        title: getTitle(plugin),
      },
      plugin,
      type: PluginType.Predefined
    }
  }, [getTitle])

  return get;
}