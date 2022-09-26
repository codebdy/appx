import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAppParams } from "../../plugin-sdk/contexts/appRoot";
import { MaterialTab } from "../model";
import { useConvertMaterialFromPlugin } from "./useConvertMaterialFromPlugin";
import { useExtractMaterialGroupFromPlugin } from "./useExtractMaterialGroupFromPlugin";

export function useUploadedMaterialTabs() {
  const { device } = useAppParams();
  const { uploadedPlugins, materialConfig } = useAppParams();
  const { t } = useTranslation();
  const convert = useConvertMaterialFromPlugin();
  const getComponent = useCallback((name: string) => {
    for (const plugin of uploadedPlugins) {
      for (const component of plugin.plugin?.components?.[device] || []) {
        if (component.name === name) {
          return convert(component)
        }
      }
    }
    return undefined
  }, [uploadedPlugins, device, convert]);

  const getMaterials = useCallback((names: string[]) => {
    return names?.map(name => getComponent(name)).filter(material => material)
  }, [getComponent]);

  const findNameInConfig = useCallback((name) => {
    for (const tab of materialConfig?.schemaJson?.tabs || []) {
      if (tab.collopsesItems?.find(item => item.components?.find(nm => nm === name))) {
        return true;
      }
    }
  }, [materialConfig])
  const extract = useExtractMaterialGroupFromPlugin();

  const getOtherTab = useCallback(() => {
    const usefullPlugins = uploadedPlugins.filter(plugin => {
      return plugin.plugin?.components?.[device].length &&
        !plugin.plugin?.components?.[device].find(com => findNameInConfig(com.name))
    })
    if (usefullPlugins.length > 0) {
      return {
        title: t("Materials.Other"),
        uuid: "TAB-OTHER",
        groups: usefullPlugins?.map(plugin => extract(plugin.plugin)) || []
      }
    }
  }, [uploadedPlugins, device, findNameInConfig, extract, t])

  //tab={t("Materials.Other")} key={"TAB-OTHER"}
  const uploadTabs = useMemo(() => {
    const tabs: MaterialTab[] = [];
    for (const tab of materialConfig?.schemaJson?.tabs || []) {
      tabs.push(
        {
          title: tab.title,
          uuid: tab.uuid,
          groups: tab.collopsesItems.map(group => {
            return {
              uuid: group.uuid,
              title: group.title,
              materials: getMaterials(group.components),
            }
          })
        }
      )
    }
    const otherTab = getOtherTab()
    otherTab && tabs.push(otherTab)
    return tabs
  }, [getMaterials, getOtherTab])

  return uploadTabs;
}