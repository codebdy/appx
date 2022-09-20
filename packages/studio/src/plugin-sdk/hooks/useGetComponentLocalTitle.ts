import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { IMaterialComponent } from "../model";

export function useGetComponentLocalTitle() {
  const { i18n } = useTranslation();
  const getComponentTitle = useCallback((com: IMaterialComponent) => {
    return com?.behavior?.designerLocales?.[i18n.language]?.title
  }, [i18n.language])

  return getComponentTitle;
}