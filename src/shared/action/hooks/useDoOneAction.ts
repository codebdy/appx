import { useCallback } from "react";
import { ActionType, IAppxAction, IConfirmAction, IOpenPageAction, ISuccessAction } from "../model";
import { useBatchDelete } from "./useBatchDelete";
import { useBatchUpdate } from "./useBatchUpdate";
import { useCloseDialog } from "./useCloseDialog";
import { useClosePage } from "./useClosePage";
import { useConfirm } from "./useConfirm";
import { useDeleteData } from "./useDeleteData";
import { useOpenPage } from "./useOpenPage";
import { useReset } from "./useReset";
import { useSaveData } from "./useSaveData";
import { useShowSuccess } from "./useShowSuccess";
import { useTableSearch } from "./useTableSearch";

export function useDoOneAction() {
  const openPage = useOpenPage();
  const closePage = useClosePage();
  const deleteData = useDeleteData();
  const reset = useReset();
  const showSuccess = useShowSuccess();
  const save = useSaveData();
  const confirm = useConfirm();
  const closeDialog = useCloseDialog();
  const batchDelete = useBatchDelete();
  const batchUpdate = useBatchUpdate();
  const submitSearch = useTableSearch();

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
          case ActionType.BatchDelete:
            await batchDelete();
            break;
          case ActionType.BatchUpdate:
            await batchUpdate();
            break;
          case ActionType.SubmitSearch:
            submitSearch();
            break;
        }
      } catch (err) {
        reject(err);
      }
      resolve(undefined);
    })

  }, [batchDelete, batchUpdate, closeDialog, closePage, confirm, deleteData, openPage, reset, save, showSuccess, submitSearch])

  return doAction;
}