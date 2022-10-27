import { useRecoilValue } from "recoil";
import { useSelectedAppUuid } from "~/plugin-sdk/contexts/desinger";
import { packagesState } from "../recoil";

export function usePackages(){
  const appId = useSelectedAppUuid();

  return useRecoilValue(packagesState(appId));
}