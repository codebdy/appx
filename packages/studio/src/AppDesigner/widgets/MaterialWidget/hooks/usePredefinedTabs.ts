import { IMaterialComponent, useGetPluginLocalMessage } from "../../../../plugin-sdk";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { usePredefinedPlugins } from "../../../../plugin/contexts";
import { useAppParams } from "../../../../shared/AppRoot/context";

export interface ITab {
  title: string;
  uuid: string;
  collopsesItems: ICollapseItem[];
}

export interface ICollapseItem {
  title: string;
  uuid: string;
  components: IMaterialComponent[];
}


export function usePredefinedTabs() {
  const { device } = useAppParams();
  const { t } = useTranslation();
  const { getTitle } = useGetPluginLocalMessage();
  const predefinedPlugins = usePredefinedPlugins();

  const predefinedMaterialTabs: ITab[] = useMemo(() => {
    const tabs = [
      {
        title: t("Materials.Basic"),
        uuid: "UUID-MATERIALS-BASIC",
        collopsesItems: predefinedPlugins.map(plugin => {
          return {
            title: getTitle(plugin),
            uuid: plugin.id,
            components: plugin.components?.[device] || [],
          }
        })
      }
    ]

    return tabs;
  }, [device, getTitle, predefinedPlugins, t])

  return predefinedMaterialTabs;
}