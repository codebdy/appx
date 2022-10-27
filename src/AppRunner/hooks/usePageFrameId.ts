import { useDesignerParams } from "~/plugin-sdk/contexts/desinger";

export function usePageFrameId() {
  const { deviceConfig } = useDesignerParams();

  return deviceConfig?.schemaJson?.pageFrameUuid;
}