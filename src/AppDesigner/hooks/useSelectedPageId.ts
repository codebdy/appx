import { useRecoilValue } from "recoil";
import { useAppViewKey } from "../../plugin-sdk/contexts/appRoot";
import { selectedPageIdState } from "../recoil/atom";

export function useSelectedPageId(){
  const key = useAppViewKey()
  return useRecoilValue(selectedPageIdState(key))
}