import { useCallback } from "react";
import { createUuid, ID } from "~/shared";
import { useTranslation } from "react-i18next";
import { useGetOrchestrationByName } from "./useGetOrchestrationByName";
import { OrchestrationMeta } from "../meta/OrchestrationMeta";
import { MethodOperateType, Types } from "../meta";

export function useCreateNewOrchestration(appId: ID) {
  const getOrchestrationByName = useGetOrchestrationByName(appId);
  const { t } = useTranslation();

  const getNewName = useCallback(() => {
    const prefix = "newOrchestration";
    let index = 1;
    while (getOrchestrationByName(prefix + index)) {
      index++;
    }

    return prefix + index;
  }, [getOrchestrationByName, t]);

  const createNewCode = useCallback((operateType: MethodOperateType) => {
    const newCode: OrchestrationMeta = {
      uuid: createUuid(),
      name: getNewName(),
      script: "",
      operateType,
      type: Types.String,
      args: [],
      typeLabel: "String",
    };
    return newCode;
  }, [getNewName]);

  return createNewCode;
}
