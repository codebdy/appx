import { useCallback } from "react";
import { ID } from "~/shared";
import { ClassMeta } from "../meta/ClassMeta";
import { useChangeClass } from "./useChangeClass";
import { useCreateAttribute } from "./useCreateAttribute";

export function useCreateClassAttribute(appUuid: ID) {
  const changeClass = useChangeClass(appUuid);
  const createAttribute = useCreateAttribute(appUuid);
  const createClassAttribute = useCallback(
    (cls: ClassMeta) => {
      const attr = createAttribute(cls.attributes);
      changeClass({ ...cls, attributes: [...cls.attributes, attr] });
      return attr
    },
    [changeClass, createAttribute]
  );

  return createClassAttribute;
}
