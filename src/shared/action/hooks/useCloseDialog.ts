import { useCallback } from "react";
import { useDialogParams } from "~/plugins/actions/components/pc/Dialog/view/context";

export function useCloseDialog() {
  const {onClose} = useDialogParams()
  const close = useCallback(() => {
    onClose && onClose()
  }, [onClose])
  return close;
}