import { useCallback } from "react";
import { IOpenFileAction } from "~/plugin-sdk";

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
  const open = useCallback(async (palyload: IOpenFileAction, variables: any) => {
    try {
      const allFiles = await Promise.all(
        (await getTheFile(palyload.accept, palyload.multiple)).map(async (fileHandle) => {
          const file = await fileHandle.getFile();
          return file;
        })
      );

      if (palyload.multiple) {
        variables[palyload.variableName] = allFiles
      } else {
        variables[palyload.variableName] = allFiles?.[0]
      }
    } catch (err) {
      console.error(err)
      //中断动作链，但是不显示错误信息
      throw undefined
    }

  }, [])

  return open;
}