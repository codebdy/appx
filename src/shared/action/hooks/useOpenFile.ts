import { useCallback } from "react";
import { IOpenFileAction, useParseLangMessage } from "~/plugin-sdk";

async function getTheFile(accept: string, multiple?: boolean) {
  // open file picker
  const fileHandles = await (window as any).showOpenFilePicker({
    types: [{
      accept: {
        "file/*": accept?.split(",")
      },
    }],
    excludeAcceptAllOption: false,
    multiple: multiple,
  });

  return fileHandles;
}

export function useOpenFile() {
  const p = useParseLangMessage();

  const open = useCallback(async (palyload: IOpenFileAction, variables: any) => {
    const allFiles = await Promise.all(
      (await getTheFile(palyload.accept, palyload.multiple)).map(async (fileHandle) => {
        const file = await fileHandle.getFile();
        return file;
      })
    );

    console.log("呵呵", allFiles)
  }, [])

  return open;
}