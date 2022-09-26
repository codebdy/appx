import { useAppParams } from "../../../../../../plugin-sdk/contexts/appRoot";

export function useEntryPageId() {
  const { deviceConfig } = useAppParams();

  return deviceConfig?.schemaJson?.entryId;
}