import { useRecoilValue } from "recoil";
import { useAppParams, useAppViewKey } from "@rxdrag/plugin-sdk/contexts/appRoot";
import { processesState } from "../recoil/atoms";

export function useProcesses() {
  const { app } = useAppParams()
  const key = useAppViewKey()
  return useRecoilValue(processesState(app?.uuid))
}