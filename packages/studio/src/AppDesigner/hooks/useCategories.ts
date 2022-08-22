import { useRecoilValue } from "recoil";
import { useAppViewKey } from "../../shared/AppRoot/context";
import { categoriesState } from "../recoil/atom";

export function useCategories() {
  const key = useAppViewKey()
  return useRecoilValue(categoriesState(key))
}