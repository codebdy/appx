import { useCallback } from "react";
import { IPlugin } from "../../plugin-sdk";
import { useGetPluginLocalMessage } from "../../plugin/hooks";
import { MaterialGroup } from "../model";
import { useExtractMaterialsFromPlugin } from "./useExtractMaterialsFromPlugin";

export function useExtractMaterialGroupFromPlugin() {
  const extractMaterials = useExtractMaterialsFromPlugin();
  const { getTitle } = useGetPluginLocalMessage();

  const extractMaterialGroupFromPlugin = useCallback((plugin: IPlugin) => {
    const group: MaterialGroup = {
      title: getTitle(plugin),
      id: plugin.id,
      materials: extractMaterials(plugin),
    }

    return group;
  }, [extractMaterials, getTitle])

  return extractMaterialGroupFromPlugin;
}