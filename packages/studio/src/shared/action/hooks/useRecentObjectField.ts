import { GeneralField, isObjectField } from "@formily/core";
import { useCallback, useMemo } from "react";

export function useRecentObjectField(field: GeneralField) {
  const getParentObjectField = useCallback((field: GeneralField) => {
    if (field?.parent) {
      if (isObjectField(field.parent)) {
        return field?.parent
      }
      else {
        return getParentObjectField(field?.parent)
      }
    }

    return undefined;
  }, [])

  const formField = useMemo(() => {
    return getParentObjectField(field);
  }, [field, getParentObjectField])

  return formField;
}