import { useCallback, useRef } from "react";
import { useProTableParams } from "../../../components/pc/ProTable/context";
import { useDeleteByIds } from "../../../enthooks/hooks/useDeleteByIds";

export function useBatchDelete() {
  const resolveRef = useRef<(value: unknown) => void>();
  const rejectRef = useRef<(reason?: any) => void>();
  const tableParams = useProTableParams();
  const { dataBind, selectedRowKeys } = tableParams;
  const [doDelete ] = useDeleteByIds(dataBind?.entityName, {
    onCompleted: () => {
      resolveRef.current && resolveRef.current(undefined);
      tableParams.selectedRowKeys = [];
    },
    onError: (error) => {
      rejectRef.current && rejectRef.current(error);
    }
  });

  const batchDelete = useCallback(() => {
    const p = new Promise((resolve, reject) => {
      if (!selectedRowKeys?.length) {
        reject(new Error("No data to delete"));
      }
      resolveRef.current = resolve;
      rejectRef.current = reject;
      doDelete(selectedRowKeys?.map(key => key?.toString()));
    });
    return p;
  }, [doDelete, selectedRowKeys])

  return batchDelete;
}