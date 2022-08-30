import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { usePageParams } from "../../AppRunner/context/page";

export function useConvertQueryVariables() {
  const { dataId } = useParams();
  const { dataId: popDataId } = usePageParams() || {};

  const convertQueryVariables = useCallback((variables?: any) => {
    if (!variables) {
      return variables;
    }

    for (const key of Object.keys(variables)) {
      if (variables[key] === "$dataId") {
        variables[key] = popDataId || dataId;
      }
    }

    return variables;
  }, [dataId, popDataId])

  return convertQueryVariables;
}