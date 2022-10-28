import { useDeviceConfig } from "~/AppRunner/hooks/useDeviceConfig";

export function useEntryPageUuid() {
  return useDeviceConfig()?.schemaJson?.entryUuid;
}