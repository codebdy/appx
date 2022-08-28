import { useCallback } from "react";
import { ActionType, IAppxAction, IOpenPageAction, ISuccessAction } from "../model";
import { useClosePage } from "./useClosePage";
import { useDeleteData } from "./useDeleteData";
import { useOpenPage } from "./useOpenPage";
import { useReset } from "./useReset";
import { useShowSuccess } from "./useShowSuccess";

export function useDoOneAction() {
  const openPage = useOpenPage();
  const closePage = useClosePage();
  const deleteData = useDeleteData();
  const reset = useReset();
  const showSuccess = useShowSuccess();

  const doAction = useCallback((action: IAppxAction) => {
    return new Promise(async (resolve, reject) => {
      if (action.actionType === ActionType.OpenPage) {
        const payload = action.payload as IOpenPageAction;
        openPage(payload);
      } else if (action.actionType === ActionType.ClosePage) {
        closePage();
      } else if (action.actionType === ActionType.DeleteData) {
        await deleteData();
      } else if(action.actionType === ActionType.Reset){
        reset();
      } else if(action.actionType === ActionType.SuccessMessage){
        showSuccess(action.payload as ISuccessAction)
      }
      resolve(undefined);
    })

  }, [closePage, deleteData, openPage, reset, showSuccess])

  return doAction;
}