import { useRecoilValue } from "recoil";
import { useSelectedAppUuid } from "../../shared/AppRoot/context";
import { packagesState } from "../recoil/atoms";

export function usePackages(){
  const appUuid = useSelectedAppUuid();

  return useRecoilValue(packagesState(appUuid));
}