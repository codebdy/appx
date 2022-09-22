import { useAppParams } from "../../shared/AppRoot/context";

export function useEntryPageId() {
  const { deviceConfig } = useAppParams();

  return deviceConfig?.schemaJson?.entryId;
}