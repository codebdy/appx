import { useRecoilValue } from "recoil";
import { useAppViewKey } from "../../shared/AppRoot/context";
import { selectedPageIdState } from "../recoil/atom";

export function useSelectedPageId(){
  const key = useAppViewKey()
  return useRecoilValue(selectedPageIdState(key))
}