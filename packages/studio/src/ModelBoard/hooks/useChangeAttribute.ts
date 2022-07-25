import { useCallback } from "react";
import { AttributeMeta } from "../meta/AttributeMeta";
import { ClassMeta } from "../meta/ClassMeta";
import { useChangeClass } from "./useChangeClass";
import { useCheckClassProperyName } from "./useCheckClassProperyName";
import { ID } from "../../shared";
import { useAlertError } from "../../hooks/useAlertError";
import { getLocalMessage } from "../../locales/getLocalMessage";

export function useChangeAttribute(appId: ID) {
  const changeEntity = useChangeClass(appId);
  const alertError = useAlertError();
  const chackName = useCheckClassProperyName(appId);

  const changeAttribute = useCallback(
    (attr: AttributeMeta, cls: ClassMeta) => {
      if (!chackName(cls.uuid, attr.name, attr.uuid)) {
        alertError(getLocalMessage("model.error-name-repeat"));
        return;
      }
      changeEntity({
        ...cls,
        attributes: cls.attributes.map((col) =>
          col.uuid === attr.uuid ? attr : col
        ),
      });
    },
    [alertError, chackName, changeEntity]
  );

  return changeAttribute;
}
