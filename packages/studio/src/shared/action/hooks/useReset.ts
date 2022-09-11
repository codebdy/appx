import { useCallback } from "react";
import { useRecentObjectField } from "./useRecentObjectField";

export function useReset() {
  const objectField = useRecentObjectField();
  const reset = useCallback(() => {
    objectField?.reset()
  }, [objectField]);

  return reset;
}