import { IPlugin } from "../../../plugin-sdk/model";
import { useMemo } from "react";
import { IInstalledPlugin } from "../context";
import { useGetInstalledPlugin } from "./useGetInstalledPlugin";
declare const window: Window & { rxPlugin: IPlugin };

export function usePredefinedPlugins() {
  const get = useGetInstalledPlugin();
  
  const predefinedPlugins = useMemo(async () => {
    const plugins: IInstalledPlugin[] = []
    await import("../../../plugins/inputs/index");
    if(window.rxPlugin){
      plugins.push(get(window.rxPlugin))
    }

    window.rxPlugin = undefined;
    return plugins
  }, [get])

  return predefinedPlugins;
}