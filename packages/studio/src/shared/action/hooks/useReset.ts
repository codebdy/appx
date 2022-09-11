import { useCallback } from "react";
import { useField } from "@formily/react";
import { useRecentObjectField } from "./useRecentObjectField";

export function useReset() {
  const field = useField();
  const objectField = useRecentObjectField(field);
  const reset = useCallback(() => {
    objectField?.reset()
  }, [objectField]);

  return reset;
}