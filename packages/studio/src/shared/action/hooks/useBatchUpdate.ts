import { useSet } from "../../../enthooks/hooks/useSet";
import { useCallback, useRef } from "react";
import { useProTableParams } from "../../../components/pc/ProTable/context";
import { useShowError } from "../../../hooks/useShowError";

export function useBatchUpdate(){
  const resolveRef = useRef<(value: unknown) => void>();
  const rejectRef = useRef<(reason?: any) => void>();
  const tableParams = useProTableParams();
  const { dataBind, selectedRowKeys } = tableParams;
  const [doSet, { error }] = useSet(dataBind?.entityName, {
    onCompleted: () => {
      resolveRef.current && resolveRef.current(undefined);
      tableParams.selectedRowKeys = [];
    },
    onError: (error) => {
      rejectRef.current && rejectRef.current(error);
    }
  });

  useShowError(error);
  const batchUpdate = useCallback(()=>{
    const p = new Promise((resolve, reject) => {
      if (!selectedRowKeys?.length) {
        reject(new Error("No data to delete"));
      }
      resolveRef.current = resolve;
      rejectRef.current = reject;
      doSet(selectedRowKeys?.map(key => key?.toString()));
    });
    return p;
  }, [doSet, selectedRowKeys])

  return batchUpdate
}