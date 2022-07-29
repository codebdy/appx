import { useCallback } from "react";
import { useAlertError } from "../../hooks/useAlertError";
import { getLocalMessage } from "../../locales/getLocalMessage";
import { ID } from "../../shared";
import { ClassMeta } from "../meta/ClassMeta";
import { MethodMeta } from "../meta/MethodMeta";
import { useChangeClass } from "./useChangeClass";
import { useCheckClassProperyName } from "./useCheckClassProperyName";

export function useChangeMethod(appUuid: ID) {
  const changeClass = useChangeClass(appUuid);
  const alertError = useAlertError();
  const chackName = useCheckClassProperyName(appUuid);
  const changeMethod = useCallback(
    (method: MethodMeta, cls: ClassMeta) => {
      if (!chackName(cls.uuid, method.name, method.uuid)) {
        alertError(getLocalMessage("model.error-name-repeat"));
        return;
      }

      changeClass({
        ...cls,
        methods: cls.methods.map((mthd) =>
          mthd.uuid === method.uuid ? method : mthd
        ),
      });
    },
    [alertError, chackName, changeClass]
  );

  return changeMethod;
}