import { useCallback } from "react";
import { createUuid, ID } from "~/shared";
import { useTranslation } from "react-i18next";
import { useGetCodeByName } from "./useGetCodeByName";

export function useCreateNewCode(appId: ID) {
  const getCodeByName = useGetCodeByName(appId);
  const { t } = useTranslation();

  const getNewCodeName = useCallback(() => {
    const prefix = t("AppUml.NewCode");
    let index = 1;
    while (getCodeByName(prefix + index)) {
      index++;
    }

    return prefix + index;
  }, [getCodeByName, t]);

  const createNewCode = useCallback((packageUuid) => {
    const newCode = {
      uuid: createUuid(),
      name: getNewCodeName(),
      packageUuid,
      code: ""
    };
    return newCode;
  }, [getNewCodeName]);

  return createNewCode;
}
