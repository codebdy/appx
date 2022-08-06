import { useBundleTranslations } from "../../../../i18n/useBundleTranslations";
import { LOCALES_NS } from "../locales";

export function useLocalTranslations() {
  return useBundleTranslations(LOCALES_NS)
}