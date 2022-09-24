import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePredefinedPlugins } from "../../plugin/contexts";
import { IPredefinedMaterialTabs } from "../context";
import { MaterialTab } from "../model";
import { useExtractMaterialGroupFromPlugin } from "./useExtractMaterialGroupFromPlugin";

export function usePredefinedMaterialTabs() {
  const { t } = useTranslation();
  const extract = useExtractMaterialGroupFromPlugin();
  const predefinedPlugsins = usePredefinedPlugins();

  const basicTab: MaterialTab = useMemo(() => {
    return {
      title: t("Materials.Basic"),
      uuid: "UUID-MATERIALS-BASIC",
      groups: predefinedPlugsins?.basicPlugins?.map(plugin => extract(plugin)) || []
    }
  }, [extract, predefinedPlugsins, t])

  const frameworkTab: MaterialTab = useMemo(() => {
    return {
      title: t("Materials.FrameWork"),
      uuid: "UUID-MATERIALS-FRAMEWORK",
      groups: predefinedPlugsins?.frameworkPlugins?.map(plugin => extract(plugin)) || []
    }
  }, [extract, predefinedPlugsins, t])

  const predefinedTabs: IPredefinedMaterialTabs = useMemo(() => {
    return {
      basicTab,
      frameworkTab
    }
  }, [basicTab, frameworkTab])

  return predefinedTabs;
}