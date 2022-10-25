import { RequestOptions, useLazyRequest } from "~/enthooks";
import { useCallback } from "react";

const importGql = `
  mutation ($appFile:Upload!){
    importApp(appFile:$appFile)
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

  const importApp = useCallback((appFile: File) => {
    doImport(importGql, { appFile })
  }, [doImport]);

  return [importApp, { error, loading }];
}
