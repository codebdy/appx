import { IPlugin } from "../../plugin-sdk/model";
import { useEffect, useState } from "react";
import { materialStore2 } from "../../materials/context";
import { useTranslation } from "react-i18next";
import { useExtractMaterialGroupFromPlugin } from "../../materials/hooks/useExtractMaterialGroupFromPlugin";
declare const window: Window & { rxPlugin: IPlugin };

export function useLoadPredefinedPlugins() {
  const [predefinedPlugins, setPredefinedPlugins] = useState<IPlugin[]>()
  const { t } = useTranslation();
  const extractGroup = useExtractMaterialGroupFromPlugin();

  useEffect(() => {
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

        materialStore2.predefinedTab = {
          title: t("Materials.Basic"),
          groups: plugins.map(plugin => extractGroup(plugin)),
        }
      });
    });
  }, [extractGroup, t])

  return predefinedPlugins;
}