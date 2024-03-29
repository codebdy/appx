import { useSet } from "~/enthooks/hooks/useSet";
import { useCallback, useRef } from "react";
import { useRecentObjectField } from "./useRecentObjectField";
import { useExtractFieldInput } from "./useExtractFieldInput";
import { useArrayParams } from "~/plugin-sdk/contexts/array";

export function useBatchUpdate() {
  const resolveRef = useRef<(value: unknown) => void>();
  const rejectRef = useRef<(reason?: any) => void>();
  const arrayParams = useArrayParams();
  const { dataBind, selectedRowKeys } = arrayParams;
  const objectField = useRecentObjectField();
  const extract = useExtractFieldInput();

  const [doSet] = useSet(dataBind?.entityName, {
    onCompleted: () => {
      resolveRef.current && resolveRef.current(undefined);
      arrayParams.selectedRowKeys = [];
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