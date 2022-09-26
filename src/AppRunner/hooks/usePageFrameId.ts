import { useAppParams } from "../../plugin-sdk/contexts/appRoot";

export function usePageFrameId() {
  const { deviceConfig } = useAppParams();

  return deviceConfig?.schemaJson?.pageFrameId;
}