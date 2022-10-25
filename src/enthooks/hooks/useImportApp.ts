import { RequestOptions, useLazyRequest } from "~/enthooks";
import { useCallback } from "react";

const importGql = `
  mutation ($file:Upload!){
    importApp(appFile:$file)
  }
`

export function useImportApp(options?: RequestOptions<any>): [
  (file: File) => void,
  {
    error?: Error,
    loading?: boolean,
  }
] {

  const [doImport, { error, loading }] = useLazyRequest(options)

  const importApp = useCallback((file: File) => {
    doImport(importGql, { appFile: file })
  }, [doImport]);

  return [importApp, { error, loading }];
}
