import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function useResourceBundles(nameSpace: string, bundles: { [key: string]: any }, onComplate?: () => void) {
  const { i18n } = useTranslation();

  useEffect(() => {
    for (const key of Object.keys(bundles)) {
      if (!i18n.hasResourceBundle(key, nameSpace)) {
        i18n.addResourceBundle(key, nameSpace, bundles[key]);
        onComplate && onComplate();
      }
    };

  }, [bundles, i18n, nameSpace, onComplate]);
}