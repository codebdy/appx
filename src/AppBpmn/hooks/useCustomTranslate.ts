import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export function useCustomTranslate() {
  const { t } = useTranslation();

  const translate = useCallback((template, replacements) => {
    template = t("AppBpmn." + template) || template;
    return template.replace(/{([^}]+)}/g, function (_, key) {
      return replacements[key] || '{' + key + '}';
    })
  }, [t]);

  return translate;
}