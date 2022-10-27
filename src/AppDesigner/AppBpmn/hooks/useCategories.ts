import { useRecoilValue } from "recoil";
import { useAppViewKey } from "@rxdrag/plugin-sdk/contexts/appRoot";
import { categoriesState } from "../recoil/atoms";

export function useCategories() {
  const key = useAppViewKey()
  return useRecoilValue(categoriesState(key))
}