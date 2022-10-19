import { usePostOne } from "~/enthooks/hooks/usePostOne";
import { useCallback, useRef } from "react";
import { useInstanceParams } from "@rxdrag/plugin-sdk/contexts/instance";
import { useExtractFieldInput } from "./useExtractFieldInput";
import { useRecentObjectField } from "./useRecentObjectField";

export function useSaveData() {
  const { entityName, instance } = useInstanceParams()
  const field = useRecentObjectField();
  const resolveRef = useRef<(value: unknown) => void>();
  const rejectRef = useRef<(reason?: any) => void>();
  const extract = useExtractFieldInput();
  const [post] = usePostOne(entityName, {
    onCompleted: (data: any) => {
      resolveRef.current && resolveRef.current(data)
    },
    onError: (err: Error) => {
      rejectRef.current && rejectRef.current(err)
    }
  })

  const save = useCallback(() => {
    const p = new Promise((resolve, reject) => {
      resolveRef.current = resolve;
      rejectRef.current = reject;
      field.validate()
        .then(() => {
          post({ id: instance?.id, ...extract(field) || {} });
        })
        .catch((err: Error) => {
          reject(err)
        })
    });
    return p;
  }, [extract, field, instance, post])

  return save;
}