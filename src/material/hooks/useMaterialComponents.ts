import { useMemo } from "react";
import { usePredefinedPlugins } from "../../plugin/contexts";
import { useAppParams } from "@rxdrag/plugin-sdk/contexts/appRoot";
import { IPlugin } from "@rxdrag/appx-plugin-sdk";
import { useConvertMaterialFromPlugin } from "./useConvertMaterialFromPlugin";

export function useMaterialComponents() {
  const { uploadedPlugins, debugPlugins, device } = useAppParams();
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