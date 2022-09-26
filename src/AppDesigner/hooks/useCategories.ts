import { useRecoilValue } from "recoil";
import { useAppViewKey } from "../../plugin-sdk/contexts/appRoot";
import { categoriesState } from "../recoil/atom";

export function useCategories() {
  const key = useAppViewKey()
  return useRecoilValue(categoriesState(key))
}