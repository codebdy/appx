import { IPlugin } from "../../plugin-sdk/model";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useExtractMaterialGroupFromPlugin } from "../../material/hooks/useExtractMaterialGroupFromPlugin";
declare const window: Window & { rxPlugin: IPlugin };

export function useLoadPredefinedPlugins() {
  const [predefinedPlugins, setPredefinedPlugins] = useState<IPlugin[]>()
  const { t } = useTranslation();
  const extractGroup = useExtractMaterialGroupFromPlugin();

  useEffect(() => {
    console.log("加载预定义插件")
    const plugins: IPlugin[] = [];
    import("../../plugins/inputs/index").then(() => {
      if (window.rxPlugin) {
        plugins.push(window.rxPlugin)
      }
      window.rxPlugin = undefined;
      import("../../plugins/layouts/index").then(() => {
        if (window.rxPlugin) {
          plugins.push(window.rxPlugin)
        }
        window.rxPlugin = undefined;
        setPredefinedPlugins(plugins);
      });
    });
  }, [extractGroup, t])

  return predefinedPlugins;
}