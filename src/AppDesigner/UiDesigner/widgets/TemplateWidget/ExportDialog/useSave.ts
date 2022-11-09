import { useCallback } from "react";
import { saveFile } from "./saveFile";

export function useSave(onSaved?: () => void) {

  const save = useCallback(
    () => {
      saveFile('template', JSON.stringify({})).then(
        (savedName) => {
          if (savedName) {

            onSaved && onSaved();
          }
        }
      );
    },
    [onSaved]
  );
  return save;
}
