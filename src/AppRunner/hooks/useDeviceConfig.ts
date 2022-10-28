import { useMemo } from "react";
import { useAppParams } from "~/plugin-sdk/contexts/app";

export function useDeviceConfig() {
  const { app, device } = useAppParams();

  const config = useMemo(() => {
    return app?.partsOfAppDeviceConfig?.find(cfg => cfg.device === device)
  }, [app, device])

  return config;
}