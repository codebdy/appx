import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useAppParams } from "../shared/AppRoot/context";

export const LANG_RESOURCE_PREFIX = "$src:";
export const LANG_INLINE_PREFIX = "$inline:"

export function useParseLangMessage() {
  const { i18n } = useTranslation();
  const { langLocales } = useAppParams();

  const parse = useCallback((message?: string) => {
    if (message?.startsWith(LANG_RESOURCE_PREFIX)) {
      const key = message.substring(LANG_RESOURCE_PREFIX.length);
      return langLocales.find(lang => lang.name === key)?.schemaJson?.[i18n.language];
    } else if (message?.startsWith(LANG_INLINE_PREFIX)) {
      const json = JSON.parse(message.substring(LANG_INLINE_PREFIX.length));
      return json[i18n.language];
    } else {
      return message;
    }
  }, [i18n.language, langLocales]);

  return parse;
}