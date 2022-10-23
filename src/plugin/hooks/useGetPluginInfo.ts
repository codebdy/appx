import { IPlugin } from "@rxdrag/appx-plugin-sdk";
import { useCallback } from "react";
import { IPluginInfo, PluginType } from "~/model";
import { useAppParams } from "@rxdrag/plugin-sdk/contexts/appRoot";
import { useGetPluginLocalMessage } from "./useGetPluginLocalMessage";

export function useGetPluginInfo() {
  const { app } = useAppParams();

  const { getTitle, getDescription } = useGetPluginLocalMessage();

  const getPlugInfo = useCallback((plugin: IPlugin, url: string, type: PluginType): IPluginInfo => {
    return {
      app: app,
      url,
      type,
      title: getTitle(plugin),
      pluginId: plugin.id,
      description: getDescription(plugin),
      version: plugin.version,
    }
  }, [app?.uuid, getDescription, getTitle])

  return getPlugInfo;
}