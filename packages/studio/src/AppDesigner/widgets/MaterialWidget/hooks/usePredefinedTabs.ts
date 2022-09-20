import { useGetPluginLocalMessage } from "../../../../plugin-sdk";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { IMaterialTab } from "../../../../plugin-sdk/model";
import { usePredefinedPlugins } from "../../../../shared/contexts/predefinedPlugins";

export function usePredefinedTabs() {
  const { t } = useTranslation();
  const { getTitle } = useGetPluginLocalMessage();
  const predefinedPlugins = usePredefinedPlugins();

  const predefinedMaterialTabs: IMaterialTab[] = useMemo(() => {
    const tabs = [
      {
        title: t("Materials.Basic"),
        uuid: "UUID-MATERIALS-BASIC",
        collopsesItems: predefinedPlugins.map(plugin => {
          return {
            title: getTitle(plugin),
            uuid: plugin.id,
            components: [],
          }
        })
      }
    ]

    return tabs;
  }, [getTitle, predefinedPlugins, t])

  return predefinedMaterialTabs;
}