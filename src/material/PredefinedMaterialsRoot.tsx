import React, { useMemo } from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { usePredefinedPlugins } from "../plugin/contexts";
import { PredefinedMaterialTabContext } from "./context";
import { useExtractMaterialGroupFromPlugin } from "./hooks/useExtractMaterialGroupFromPlugin";
import { usePredefinedMaterialTabs } from "./hooks/usePredefinedMaterialTabs";

export const PredefinedMaterialsRoot = memo((
  props: {
    children: React.ReactNode,
  }
) => {
  const { t } = useTranslation();
  const predefinedTabs = usePredefinedMaterialTabs();

  return (
    <PredefinedMaterialTabContext.Provider value={predefinedTabs}>
      {props.children}
    </PredefinedMaterialTabContext.Provider>
  )
})