import { useMemo } from "react";
import { useAppParams } from "~/plugin-sdk/contexts/app";

export function useEntryPageUuid() {
  const { app, device } = useAppParams();

  const entryUuid = useMemo(() => {
    return app?.partsOfAppDeviceConfig?.find(config => config.device === device)?.schemaJson?.entryUuid
  }, [app, device])

  return entryUuid;
}