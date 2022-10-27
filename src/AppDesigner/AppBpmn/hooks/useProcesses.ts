import { useRecoilValue } from "recoil";
import { useAppViewKey } from "@rxdrag/plugin-sdk/contexts/appRoot";
import { processesState } from "../recoil/atoms";

export function useProcesses() {
  const key = useAppViewKey()
  return useRecoilValue(processesState(key))
}