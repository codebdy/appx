import { useTranslation } from "react-i18next";
import { useProTableParams } from "../context";
import { LOCALES_NS } from "../locales";

export function useLocalTranslations() {
  const { localesAdded } = useProTableParams();
  return useTranslation(localesAdded ? LOCALES_NS : undefined)
}