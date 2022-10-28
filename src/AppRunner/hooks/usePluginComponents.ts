import { useEffect, useMemo, useState } from "react";
import { usePredefinedPlugins } from "../../plugin/contexts";
import { Device, IPlugin } from "@rxdrag/appx-plugin-sdk";
import { useConvertMaterialFromPlugin } from "../../material/hooks/useConvertMaterialFromPlugin";
import { useLoadPlugins } from "~/plugin/hooks";
import { IApp } from "~/model";

export function usePluginComponents(app?:IApp, device?:Device) {
  const [installedPlugins, setInstalledPlugins] = useState<IPlugin[]>([])
  const load = useLoadPlugins();

  useEffect(() => {
    load(app?.plugins || []).then((plugins) => {
      setInstalledPlugins(plugins.map(plugin => plugin.plugin));
    })
  }, [app?.plugins, load])

  const predefinedPlugins = usePredefinedPlugins();
  const convert = useConvertMaterialFromPlugin();
  const materialComponents = useMemo(() => {
    const components = {} as any;
    const plugins: IPlugin[] = [
      ...(installedPlugins || []),
      ...(predefinedPlugins.basicPlugins || []),
      ...(predefinedPlugins.frameworkPlugins || [])
    ];
    for (const plugin of plugins) {
      for (const material of plugin?.components[device] || []) {
        components[material.name] = convert(material).component
      }
    }
    return components
  }, [installedPlugins, device, predefinedPlugins, convert])

  return materialComponents;
}