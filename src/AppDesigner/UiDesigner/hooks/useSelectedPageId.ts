import { useRecoilValue } from "recoil";
import { useDesignerViewKey } from "~/plugin-sdk/contexts/desinger";
import { selectedPageIdState } from "../recoil/atom";

export function useSelectedPageId(){
  const key = useDesignerViewKey()
  return useRecoilValue(selectedPageIdState(key))
}