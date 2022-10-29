import { useSet } from "~/enthooks/hooks/useSet";
import { useCallback, useRef } from "react";
import { useRecentObjectField } from "./useRecentObjectField";
import { useExtractFieldInput } from "./useExtractFieldInput";
import { useTableParams } from "@rxdrag/plugin-sdk";

export function useBatchUpdate() {
  const resolveRef = useRef<(value: unknown) => void>();
  const rejectRef = useRef<(reason?: any) => void>();
  const tableParams = useTableParams();
  const { dataBind, selectedRowKeys } = tableParams;
  const objectField = useRecentObjectField();
  const extract = useExtractFieldInput();

  const [doSet] = useSet(dataBind?.entityName, {
    onCompleted: () => {
      resolveRef.current && resolveRef.current(undefined);
      tableParams.selectedRowKeys = [];
    },
    onError: (error) => {
      rejectRef.current && rejectRef.current(error);
    }
  });


  const batchUpdate = useCallback(() => {
    const p = new Promise((resolve, reject) => {
      if (!selectedRowKeys?.length) {
        reject(new Error("No data to delete"));
      }
      resolveRef.current = resolve;
      rejectRef.current = reject;
      doSet(extract(objectField), { id: { _in: selectedRowKeys } });
    });
    return p;
  }, [doSet, extract, objectField, selectedRowKeys])

  return batchUpdate
}