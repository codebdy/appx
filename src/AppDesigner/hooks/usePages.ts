import { useRecoilValue } from "recoil";
import { useAppViewKey } from "../../plugin-sdk/contexts/appRoot";
import { pagesState } from "../recoil/atom";

export function usePages() {
  const key = useAppViewKey()
  return useRecoilValue(pagesState(key))
}