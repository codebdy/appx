import { useAppParams } from "@rxdrag/plugin-sdk/contexts/appRoot";

export function usePageFrameId() {
  const { deviceConfig } = useAppParams();

  return deviceConfig?.schemaJson?.pageFrameUuid;
}