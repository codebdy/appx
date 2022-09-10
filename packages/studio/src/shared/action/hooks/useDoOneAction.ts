import { useCallback } from "react";
import { ActionType, IAppxAction, IConfirmAction, IOpenPageAction, ISuccessAction } from "../model";
import { useCloseDialog } from "./useCloseDialog";
import { useClosePage } from "./useClosePage";
import { useConfirm } from "./useConfirm";
import { useDeleteData } from "./useDeleteData";
import { useOpenPage } from "./useOpenPage";
import { useReset } from "./useReset";
import { useSaveData } from "./useSaveData";
import { useShowSuccess } from "./useShowSuccess";

export function useDoOneAction() {
  const openPage = useOpenPage();
  const closePage = useClosePage();
  const deleteData = useDeleteData();
  const reset = useReset();
  const showSuccess = useShowSuccess();
  const save = useSaveData();
  const confirm = useConfirm();
  const closeDialog = useCloseDialog();

  const doAction = useCallback((action: IAppxAction) => {
    return new Promise(async (resolve, reject) => {
      try {
        switch (action.actionType) {
          case ActionType.OpenPage:
            const payload = action.payload as IOpenPageAction;
            openPage(payload);
            break;
          case ActionType.ClosePage:
            closePage();
            break;
          case ActionType.DeleteData:
            await deleteData();
            break;
          case ActionType.Reset:
            reset();
            break;
          case ActionType.SuccessMessage:
            showSuccess(action.payload as ISuccessAction);
            break;
          case ActionType.SaveData:
            await save();
            break;
          case ActionType.Confirm:
            await confirm(action.payload as IConfirmAction);
            break;
          case ActionType.CloseDialog:
            closeDialog();
            break;
        }
      } catch (err) {
        reject(err);
      }
      resolve(undefined);
    })

  }, [closeDialog, closePage, confirm, deleteData, openPage, reset, save, showSuccess])

  return doAction;
}