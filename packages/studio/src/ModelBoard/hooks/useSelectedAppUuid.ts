import { useRecoilValue } from "recoil";
import { selectedAppUuidState } from "../recoil/atoms";

export function useSelectedAppUuid(){
  const serviceId = useRecoilValue(selectedAppUuidState);
  return serviceId
}