import { useRecoilValue } from "recoil";
import { useAppKey } from "../../shared/AppRoot/context";
import { selectedPageIdState } from "../recoil/atom";

export function useSelectedPageId(){
  const key = useAppKey()
  return useRecoilValue(selectedPageIdState(key))
}