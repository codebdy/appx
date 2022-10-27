import { useEffect, useMemo, useState } from "react";
import { usePredefinedPlugins } from "../../plugin/contexts";
import { IPlugin } from "@rxdrag/appx-plugin-sdk";
import { useConvertMaterialFromPlugin } from "../../material/hooks/useConvertMaterialFromPlugin";
import { useAppParams } from "~/plugin-sdk/contexts/app";
import { useLoadPlugins } from "~/plugin/hooks";

export function usePluginComponents() {
  const [installedPlugins, setInstalledPlugins] = useState<IPlugin[]>([])
  const load = useLoadPlugins();
  const { app, device } = useAppParams();

  useEffect(() => {
    load(app?.plugins || []).then((plugins) => {
      setInstalledPlugins(plugins.map(plugin => plugin.plugin));
    })
  }, [app, load])

  const predefinedPlugins = usePredefinedPlugins();
  const convert = useConvertMaterialFromPlugin();
  const materialComponents = useMemo(() => {
    const designers = {} as any;
    const plugins: IPlugin[] = [
      ...(installedPlugins || []),
      ...(predefinedPlugins.basicPlugins || []),
      ...(predefinedPlugins.frameworkPlugins || [])
    ];
    for (const plugin of plugins) {
      for (const material of plugin?.components[device] || []) {
        designers[material.name] = convert(material).component
      }
    }
    return designers
  }, [installedPlugins, device, predefinedPlugins, convert])

  return materialComponents;
}