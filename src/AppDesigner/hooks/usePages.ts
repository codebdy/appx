import { useRecoilValue } from "recoil";
import { useAppViewKey } from "../../shared/AppRoot/context";
import { pagesState } from "../recoil/atom";

export function usePages() {
  const key = useAppViewKey()
  return useRecoilValue(pagesState(key))
}