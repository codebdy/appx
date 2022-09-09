import { useCallback } from "react";
import { useDialogParams } from "../../../components/pc/Dialog/context";

export function useCloseDialog() {
  const {onClose} = useDialogParams()
  const close = useCallback(() => {
    onClose && onClose()
  }, [onClose])
  return close;
}