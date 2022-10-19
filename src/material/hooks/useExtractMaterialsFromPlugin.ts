import { useCallback } from "react";
import { IPlugin } from "@rxdrag/appx-plugin-sdk";
import { useAppParams } from "@rxdrag/plugin-sdk/contexts/appRoot";
import { useConvertMaterialFromPlugin } from "./useConvertMaterialFromPlugin";

export function useExtractMaterialsFromPlugin() {
  const { device } = useAppParams();
  const convert = useConvertMaterialFromPlugin();

  const extractMaterialsFromPlugin = useCallback((plugin: IPlugin) => {
    return plugin.components[device]?.map(material => convert(material)) || []
  }, [convert, device])
  return extractMaterialsFromPlugin;
}
