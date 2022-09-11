import { useSet } from "../../../enthooks/hooks/useSet";
import { useCallback, useRef } from "react";
import { useProTableParams } from "../../../components/pc/ProTable/context";
import { useShowError } from "../../../hooks/useShowError";
import { useField } from "@formily/react";
import { useRecentObjectField } from "./useRecentObjectField";
import { useExtractFieldInput } from "./useExtractFieldInput";

export function useBatchUpdate() {
  const resolveRef = useRef<(value: unknown) => void>();
  const rejectRef = useRef<(reason?: any) => void>();
  const tableParams = useProTableParams();
  const { dataBind, selectedRowKeys } = tableParams;
  const field = useField();
  const objectField = useRecentObjectField();
  const extract = useExtractFieldInput();

  console.log("哈哈", objectField, field)

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