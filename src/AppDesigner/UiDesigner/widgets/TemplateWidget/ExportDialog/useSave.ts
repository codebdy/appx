import { useCallback } from "react";
import { saveFile } from "./saveFile";

export function useSave(onSaved?: () => void) {

  const save = useCallback(
    (name, content?:any) => {
      saveFile(name, content).then(
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
