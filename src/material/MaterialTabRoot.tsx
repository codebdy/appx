import React, { useMemo } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next";
import { useExtractMaterialGroupFromPlugin } from "./hooks/useExtractMaterialGroupFromPlugin";
import { useAppParams } from "../shared/AppRoot/context";
import { AppMaterialTabsContext } from "./context";
import { useUploadedMaterialTabs } from "./hooks/useUploadedMaterialTabs";

export const MaterialTabRoot = memo((
  props: {
    children: React.ReactNode
  }
) => {
  const { children } = props;
  const extract = useExtractMaterialGroupFromPlugin();
  const { t } = useTranslation();
  const { debugPlugins } = useAppParams();
  const uploadedMaterialTabs = useUploadedMaterialTabs();

  const contextValue = useMemo(() => {
    return {
      uploadedMaterialTabs: uploadedMaterialTabs,
      debugMaterialTab: debugPlugins.filter(plugin => plugin?.plugin).length > 0 ? {
        title: t("Materials.Debug"),
        uuid: "UUID-MATERIALS-DEBUG",
        groups: debugPlugins?.map(plugin => extract(plugin.plugin)) || []
      } : undefined,
    }
  }, [debugPlugins, extract, t])

  return (
    <AppMaterialTabsContext.Provider value={contextValue}>
      {children}
    </AppMaterialTabsContext.Provider>
  )
})