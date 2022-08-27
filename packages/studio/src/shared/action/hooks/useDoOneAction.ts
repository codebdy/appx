import { useCallback } from "react";
import { ActionType, IAppxAction, IOpenPageAction } from "../model";
import { useOpenPage } from "./useOpenPage";

export function useDoOneAction() {
  const openPage = useOpenPage();

  const doAction = useCallback((action: IAppxAction) => {
    return new Promise((resolve, reject) => {
      if (action.actionType === ActionType.OpenPage) {
        const payload = action.payload as IOpenPageAction;
        openPage(payload);
        resolve(undefined);
      }

    })
  }, [openPage])

  return doAction;
}