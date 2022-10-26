import { useAppParams } from "@rxdrag/plugin-sdk/contexts/appRoot";

export function useEntryPageUuid() {
  const { deviceConfig } = useAppParams();

  return deviceConfig?.schemaJson?.entryUuid;
}