import { useTranslation } from "react-i18next";
import { LOCALES_NS } from "../locales";

export function useLocalTranslations(){
  return useTranslation(LOCALES_NS)
}