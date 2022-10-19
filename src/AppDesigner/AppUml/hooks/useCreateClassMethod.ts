import { useCallback } from "react";
import { ID } from "~/shared";
import { ClassMeta } from "../meta/ClassMeta";
import { useChangeClass } from "./useChangeClass";
import { useCreateMethod } from "./useCreateMethod";

export function useCreateClassMethod(appUuid: ID) {
  const changeClass = useChangeClass(appUuid);
  const createMethod = useCreateMethod(appUuid);
  const createClassMethod = useCallback(
    (cls: ClassMeta) => {
      const method = createMethod(cls.methods);

      changeClass({ ...cls, methods: [...cls.methods||[], method] });
    },
    [changeClass, createMethod]
  );

  return createClassMethod;
}
