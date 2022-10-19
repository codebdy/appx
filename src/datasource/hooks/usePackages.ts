import { useRecoilValue } from "recoil";
import { useSelectedAppUuid } from "@rxdrag/plugin-sdk/contexts/appRoot";
import { packagesState } from "../recoil";

export function usePackages(){
  const appUuid = useSelectedAppUuid();

  return useRecoilValue(packagesState(appUuid));
}