import { IPlugin } from "../plugin-sdk/model";
import { useEffect, useRef, useState } from "react";
declare const window: Window & { rxPlugin: IPlugin };

export function useLoadPredefinedPlugins() {
  const [predefinedPlugins, setPredefinedPlugins] = useState<IPlugin[]>()

  const ref = useRef<IPlugin[]>([]);

  useEffect(() => {
    import("../plugins/inputs/index").then(() => {
      if (window.rxPlugin) {
        ref.current.push(window.rxPlugin)
      }
      window.rxPlugin = undefined;
      import("../plugins/layouts/index").then(() => {
        if (window.rxPlugin) {
          ref.current.push(window.rxPlugin)
        }
        window.rxPlugin = undefined;
        setPredefinedPlugins(ref.current);
      });
    });
  }, [])

  return predefinedPlugins;
}