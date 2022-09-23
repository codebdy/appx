import { useMemo } from "react";
import { useAppParams } from "../../shared/AppRoot/context";
import { MaterialTab } from "../model";

export function useUploadedMaterialTabs() {
  const { uploadedPlugins, materialConfig } = useAppParams();

  //tab={t("Materials.Other")} key={"TAB-OTHER"}
  const uploadTabs = useMemo(() => {
    const tabs: MaterialTab[] = [];
    for(const tab of materialConfig?.schemaJson?.tabs || []){
      tabs.push(
        {
          title: tab.title,
          uuid: tab.uuid,
          groups: tab.collopsesItems.map(group=>{
            return {
              uuid: group.uuid,
              title: group.title,
              materials: [],
            }
          })
        }
      )
    }
    return tabs
  }, [materialConfig])

  return uploadTabs;
}