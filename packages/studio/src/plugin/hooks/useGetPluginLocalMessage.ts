import { IPlugin } from "@appx/plugin-sdk";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export function useGetPluginLocalMessage() {
  const { i18n } = useTranslation();
  const getTitle = useCallback((plugin: IPlugin) => {
    return plugin?.locales?.[i18n.language]?.[plugin?.title] || plugin?.title
  }, [i18n.language])

  const getDescription = useCallback((plugin: IPlugin) => {
    return plugin?.locales?.[i18n.language]?.[plugin?.description] || plugin?.description
  }, [i18n.language])

  return { getTitle, getDescription };
}