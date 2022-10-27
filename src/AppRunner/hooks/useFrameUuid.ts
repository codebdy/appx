import { Device } from "@rxdrag/appx-plugin-sdk";
import { useMemo } from "react";
import { IApp } from "~/model";

export function useFrameUuid(app:IApp, device:Device) {
  const frameUuid = useMemo(() => {
    return app?.partsOfAppDeviceConfig?.find(config => config.device === device)?.schemaJson?.pageFrameUuid
  }, [app, device])

  return frameUuid;
}