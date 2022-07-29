import _ from "lodash";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { useAlertError } from "../../hooks/useAlertError";
import { getLocalMessage } from "../../locales/getLocalMessage";
import { ID } from "../../shared";
import { classesState } from "../recoil/atoms";
import { useGetClassAssociations } from "./useGetClassAssociations";

function hasDuplicates(array: string[]) {
  return _.some(array, function (elt, index) {
    return array.indexOf(elt) !== index;
  });
}

export function useValidate(appUuid: ID) {
  const classes = useRecoilValue(classesState(appUuid));
  const alertError = useAlertError();
  const getClassAssociations = useGetClassAssociations(appUuid);
  const validate = useCallback(() => {
    //检查属性名重复
    for (const cls of classes) {
      const names = cls.attributes?.map((atr) => atr.name) || [];
      names.push(...(cls.methods?.map((mth) => mth.name) || []));
      names.push(
        ...(getClassAssociations(cls.uuid)?.map((aso) => aso.name) || [])
      );
      if (hasDuplicates(names.filter((name) => !!name))) {
        alertError(getLocalMessage("model.duplicated-property-error"));
        return false;
      }
    }
    //检查关联类属性名冲突
    return true;
  }, [alertError, classes, getClassAssociations]);

  return validate;
}
