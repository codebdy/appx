import { useCallback } from "react";
import { getTheFile } from "~/shared/action/hooks/useOpenFile";

export function useImportTempltes() {
  const doImport = useCallback(async () => {
    try {
      const file = await Promise.all(
        (await getTheFile(".zip", false)).map(async (fileHandle) => {
          const file = await fileHandle.getFile();
          return file;
        })
      );

      
    } catch (err) {
      console.error(err)
      throw err
    }

  }, [])

  return doImport;
}