import { useCallback } from "react";
import { createUuid, ID } from "../../shared";
import {
  MethodMeta,
  MethodImplementType,
  MethodOperateType,
} from "../meta/MethodMeta";
import { Type } from "../meta/Type";
import { useGetTypeLabel } from "./useGetTypeLabel";

export function useCreateMethod(appId: ID) {
  const getTypeName = useGetTypeLabel(appId);

  const createMethod = useCallback(
    (methods: MethodMeta[]) => {
      let index = 1;
      const namePrefix = "newMethod";
      while (
        // eslint-disable-next-line no-loop-func
        methods?.find((mthd) => mthd.name === namePrefix + index)
      ) {
        index++;
      }

      const method = {
        uuid: createUuid(),
        name: namePrefix + index,
        args: [],
        type: Type.String,
        typeLabel: getTypeName(Type.String),
        implementType: MethodImplementType.Script,
        operateType: MethodOperateType.Query,
      };

      return method;
    },
    [getTypeName]
  );

  return createMethod;
}
