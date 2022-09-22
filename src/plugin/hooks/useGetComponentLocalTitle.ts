import { IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export function useGetComponentLocalTitle() {
  const { i18n } = useTranslation();
  const getComponentTitle = useCallback((com: IMaterialComponent) => {
    return com?.behaviors?.[0]?.designerLocales?.[i18n.language]?.title
  }, [i18n.language])

  return getComponentTitle;
}