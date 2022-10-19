import { useDeleteById } from "~/enthooks/hooks/useDeleteById";
import { useCallback, useRef } from "react";
import { useInstanceParams } from "@rxdrag/plugin-sdk/contexts/instance";

export function useDeleteData() {
  const resolveRef = useRef<(value: unknown) => void>();
  const rejectRef = useRef<(reason?: any) => void>();
  const { entityName, instance } = useInstanceParams()

  const [doDelete] = useDeleteById(entityName, {
    onCompleted: () => {
      resolveRef.current && resolveRef.current(undefined);
    },
    onError: (error) => {
      rejectRef.current && rejectRef.current(error);
    }
  });

  const deleteData = useCallback(() => {
    const p = new Promise((resolve, reject) => {
      if (!instance?.id) {
        reject(new Error("No data to delete"));
      }
      resolveRef.current = resolve;
      rejectRef.current = reject;
      doDelete(instance?.id);
    });
    return p;
  }, [doDelete, instance?.id])

  return deleteData;
}