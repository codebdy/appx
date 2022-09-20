import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { IMaterialTab } from "../../../../plugin-sdk/model";

export function usePredefinedTabs() {
  const { t } = useTranslation();

  const predefinedMaterialTabs: IMaterialTab[] = useMemo(() => {
    const tabs = [
      {
        title: t("Materials.Basic"),
        uuid: "UUID-MATERIALS-BASIC",
        collopsesItems: [
          {
            title: t("Materials.Inputs"),
            uuid: "UUID-MATERIALS-BASIC-INPUTS",
            components: [],
          },
          {
            title: t("Materials.Layouts"),
            uuid: "UUID-MATERIALS-BASIC-LAYOUTS",
            components: [],
          },
          {
            title: t("Materials.Arrays"),
            uuid: "UUID-MATERIALS-BASIC-ARRAYS",
            components: [],
          },
          {
            title: t("Materials.Displays"),
            uuid: "UUID-MATERIALS-BASIC-DISPLAYS",
            components: [],
          },
        ]
      }
    ]

    return tabs;
  }, [t])

  return predefinedMaterialTabs;
}