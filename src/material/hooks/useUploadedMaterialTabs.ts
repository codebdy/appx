import { useCallback, useMemo } from "react";
import { useAppParams } from "../../shared/AppRoot/context";
import { MaterialTab } from "../model";
import { useConvertMaterialFromPlugin } from "./useConvertMaterialFromPlugin";

export function useUploadedMaterialTabs() {
  const { device } = useAppParams();
  const { uploadedPlugins, materialConfig } = useAppParams();
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
  }, [uploadedPlugins, device, convert])
  const getMaterials = useCallback((names: string[]) => {
    return names?.map(name => getComponent(name)).filter(material => material)
  }, [getComponent])

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
    return tabs
  }, [getMaterials])

  return uploadTabs;
}