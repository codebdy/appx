import { useRecoilValue } from "recoil";
import { useDesignerViewKey } from "~/plugin-sdk/contexts/desinger";
import { pagesState } from "../recoil/atom";

export function usePages() {
  const key = useDesignerViewKey()
  return useRecoilValue(pagesState(key))
}