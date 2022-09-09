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
        if (action.actionType === ActionType.OpenPage) {
          const payload = action.payload as IOpenPageAction;
          openPage(payload);
        } else if (action.actionType === ActionType.ClosePage) {
          closePage();
        } else if (action.actionType === ActionType.DeleteData) {
          await deleteData();
        } else if (action.actionType === ActionType.Reset) {
          reset();
        } else if (action.actionType === ActionType.SuccessMessage) {
          showSuccess(action.payload as ISuccessAction)
        } else if (action.actionType === ActionType.SaveData) {
          await save();
        } else if (action.actionType === ActionType.Confirm) {
          await confirm(action.payload as IConfirmAction);
        } else if (action.actionType === ActionType.CloseDialog) {
          closeDialog();
        }
      } catch (err) {
        reject(err);
      }
      resolve(undefined);
    })

  }, [closeDialog, closePage, confirm, deleteData, openPage, reset, save, showSuccess])

  return doAction;
}