import { useSet } from "../../../enthooks/hooks/useSet";
import { useCallback, useRef } from "react";
import { useProTableParams } from "../../../components/pc/ProTable/context";
import { useShowError } from "../../../hooks/useShowError";
import { GeneralField, isObjectField } from "@formily/core";

export function useBatchUpdate(){
  const resolveRef = useRef<(value: unknown) => void>();
  const rejectRef = useRef<(reason?: any) => void>();
  const tableParams = useProTableParams();
  const { dataBind, selectedRowKeys } = tableParams;
  const getParentObjectField = useCallback((field: GeneralField) => {
    if (field?.parent) {
      if (isObjectField(field.parent)) {
        return field?.parent
      }
      else {
        return getParentObjectField(field?.parent)
      }
    }

    return undefined;
  }, [])

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