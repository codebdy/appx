import { useRecoilValue } from "recoil";
import { useAppViewKey } from "../../shared/AppRoot/context";
import { selectedFrameIdState } from "../recoil/atom";

export function useSelectedFrameId(){
  const key = useAppViewKey()
  return useRecoilValue(selectedFrameIdState(key))
}