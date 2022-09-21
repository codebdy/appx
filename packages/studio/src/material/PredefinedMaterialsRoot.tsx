import React, { useMemo } from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { usePredefinedPlugins } from "../plugin/contexts";
import { PredefinedMaterialTabContext } from "./context";
import { useExtractMaterialGroupFromPlugin } from "./hooks/useExtractMaterialGroupFromPlugin";
import { MaterialTab } from "./model";

export const PredefinedMaterialsRoot = memo((
  props: {
    children: React.ReactNode,
  }
) => {
  const { t } = useTranslation();
  const extract = useExtractMaterialGroupFromPlugin();
  const predefinedPlugsins = usePredefinedPlugins();
  const predefinedTab: MaterialTab = useMemo(() => {
    return {
      title: t("Materials.Basic"),
      uuid: "UUID-MATERIALS-BASIC",
      groups: predefinedPlugsins?.map(plugin => extract(plugin)) || []
    }
  }, [extract, predefinedPlugsins, t])
  return (
    <PredefinedMaterialTabContext.Provider value={predefinedTab}>
      {props.children}
    </PredefinedMaterialTabContext.Provider>
  )
})