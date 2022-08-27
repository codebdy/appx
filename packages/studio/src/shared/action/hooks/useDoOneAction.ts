import { useCallback } from "react";
import { ActionType, IAppxAction, IOpenPageAction } from "../model";
import { useClosePage } from "./useClosePage";
import { useOpenPage } from "./useOpenPage";

export function useDoOneAction() {
  const openPage = useOpenPage();
  const closePage = useClosePage();

  const doAction = useCallback((action: IAppxAction) => {
    
    return new Promise((resolve, reject) => {
      if (action.actionType === ActionType.OpenPage) {
        const payload = action.payload as IOpenPageAction;
        openPage(payload);
        resolve(undefined);
      }else if(action.actionType === ActionType.ClosePage){
        closePage();
      }

    })
  }, [closePage, openPage])

  return doAction;
}