import { IPlugin } from "@rxdrag/appx-plugin-sdk";
import { useCallback } from "react";
import { IPluginInfo, PluginType } from "../../model";
import { useAppParams } from "../../shared/AppRoot/context";
import { useGetPluginLocalMessage } from "./useGetPluginLocalMessage";

export function useGetPluginInfo() {
  const { app } = useAppParams();

  const {getTitle, getDescription} = useGetPluginLocalMessage();

  const getPlugInfo = useCallback((plugin: IPlugin, url: string, type: PluginType): IPluginInfo => {
    return {
      appUuid: app?.uuid,
      url,
      type,
      title: getTitle(plugin),
      description: getDescription(plugin),
    }
  }, [app?.uuid, getDescription, getTitle])

  return getPlugInfo;
}