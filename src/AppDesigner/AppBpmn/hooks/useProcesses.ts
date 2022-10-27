import { useRecoilValue } from "recoil";
import { useDesignerParams, useDesignerViewKey } from "~/plugin-sdk/contexts/desinger";
import { processesState } from "../recoil/atoms";

export function useProcesses() {
  const { app } = useDesignerParams()
  const key = useDesignerViewKey()
  return useRecoilValue(processesState(app?.uuid))
}