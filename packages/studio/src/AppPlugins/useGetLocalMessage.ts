import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { IPlugin } from "../plugin-sdk/model";

export function useGetLocalMessage() {
  const { i18n } = useTranslation();
  const getTitle = useCallback((plugin: IPlugin) => {
    return plugin?.loacales?.[i18n.language]?.[plugin?.title] || plugin?.title
  }, [i18n.language])

  const getDescription = useCallback((plugin: IPlugin) => {
    return plugin?.loacales?.[i18n.language]?.[plugin?.description] || plugin?.description
  }, [i18n.language])

  return { getTitle, getDescription };
}