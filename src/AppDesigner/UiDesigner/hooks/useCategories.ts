import { useRecoilValue } from "recoil";
import { useDesignerViewKey } from "~/plugin-sdk/contexts/desinger";
import { categoriesState } from "../recoil/atom";

export function useCategories() {
  const key = useDesignerViewKey()
  return useRecoilValue(categoriesState(key))
}