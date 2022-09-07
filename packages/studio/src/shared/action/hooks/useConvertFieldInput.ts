import { useCallback } from "react";
import { Field } from "@formily/core";

export function useConvertFieldInput() {
  const convert = useCallback((field: Field) => {
    console.log("哈哈", field?.["x-field-source"])
    const value = field.value;

    return value;
  }, [])

  return convert;
}