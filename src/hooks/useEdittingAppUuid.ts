import { useParams } from "react-router-dom";
import { SYSTEM_APP_UUID } from "../consts";

export function useEdittingAppUuid() {
  const { appUuid = SYSTEM_APP_UUID } = useParams();

  return appUuid;
}