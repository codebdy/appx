import { useMemo } from "react";
import { usePredefinedPlugins } from "../../plugin/contexts";
import { useDesignerParams } from "~/plugin-sdk/contexts/desinger";
import { IPlugin } from "@rxdrag/appx-plugin-sdk";
import { useConvertMaterialFromPlugin } from "./useConvertMaterialFromPlugin";

export function useMaterialComponents() {
  const { uploadedPlugins, debugPlugins, device } = useDesignerParams();
  const predefinedPlugins = usePredefinedPlugins();
  const convert = useConvertMaterialFromPlugin();
  const materialComponents = useMemo(() => {
    const designers = {} as any;
    const plugins: IPlugin[] = [
      ...(uploadedPlugins?.map(insPlugin => insPlugin.plugin) || []),
      ...(debugPlugins?.map(insPlugin => insPlugin.plugin) || []),
      ...(predefinedPlugins.basicPlugins || []),
      ...(predefinedPlugins.frameworkPlugins || [])
    ];
    for (const plugin of plugins) {
      for (const material of plugin?.components[device] || []) {
        designers[material.name] = convert(material).component
      }
    }
    return designers
  }, [uploadedPlugins, debugPlugins, device, predefinedPlugins, convert])

  return materialComponents;
}