import { useCallback } from "react";
import { IPropsSchema } from "../../plugin-sdk/model";

export function useCreateFieldSchema() {
  const create = useCallback((propsSchema: IPropsSchema) => {
    return {} as any
  }, [])

  return create;
}