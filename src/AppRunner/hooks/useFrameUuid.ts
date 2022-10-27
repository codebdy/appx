import { useMemo } from "react";
import { useAppParams } from "~/plugin-sdk/contexts/app";

export function useFrameUuid() {
  const { app, device } = useAppParams();

  const frameUuid = useMemo(() => {
    return app?.partsOfAppDeviceConfig?.find(config => config.device === device)?.schemaJson?.pageFrameUuid
  }, [app, device])

  return frameUuid;
}