import { useCallback } from "react";
import { createUuid, ID } from "../../shared";
import { AttributeMeta } from "../meta/AttributeMeta";
import { Type } from "../meta/Type";
import { useGetTypeLabel } from "./useGetTypeLabel";

export function useCreateAttribute(appId: ID, prefix?: string) {
  const getTypeName = useGetTypeLabel(appId);

  const createAttribute = useCallback(
    (attributes: AttributeMeta[]) => {
      let index = 1;
      const namePrefix = prefix || "newAttribute";
      while (
        // eslint-disable-next-line no-loop-func
        attributes.find((attr) => attr.name === namePrefix + index)
      ) {
        index++;
      }

      const attr = {
        uuid: createUuid(),
        name: namePrefix + index,
        type: Type.String,
        typeLabel: getTypeName(Type.String),
      };

      return attr;
    },
    [getTypeName, prefix]
  );

  return createAttribute;
}
