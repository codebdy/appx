import { useRecoilValue } from "recoil";
import { useDesingerKey } from "../context";
import { selectedPageIdState } from "../recoil/atom";

export function useSelectedPageId(){
  const key = useDesingerKey()
  return useRecoilValue(selectedPageIdState(key))
}