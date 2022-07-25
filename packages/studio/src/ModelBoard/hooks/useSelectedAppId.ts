import { useRecoilValue } from "recoil";
import { selectedAppIdState } from "../recoil/atoms";

export function useSelectedAppId(){
  const serviceId = useRecoilValue(selectedAppIdState);
  return serviceId
}