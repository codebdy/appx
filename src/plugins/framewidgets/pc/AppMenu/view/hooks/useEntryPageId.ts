import { useDesignerParams } from "~/plugin-sdk/contexts/desinger";

export function useEntryPageUuid() {
  const { deviceConfig } = useDesignerParams();

  return deviceConfig?.schemaJson?.entryUuid;
}