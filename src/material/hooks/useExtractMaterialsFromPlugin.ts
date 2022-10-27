import { useCallback } from "react";
import { IPlugin } from "@rxdrag/appx-plugin-sdk";
import { useDesignerParams } from "~/plugin-sdk/contexts/desinger";
import { useConvertMaterialFromPlugin } from "./useConvertMaterialFromPlugin";

export function useExtractMaterialsFromPlugin() {
  const { device } = useDesignerParams();
  const convert = useConvertMaterialFromPlugin();

  const extractMaterialsFromPlugin = useCallback((plugin: IPlugin) => {
    return plugin.components[device]?.map(material => convert(material)) || []
  }, [convert, device])
  return extractMaterialsFromPlugin;
}
