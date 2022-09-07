import { usePostOne } from "../../../enthooks/hooks/usePostOne";
import { useCallback, useRef } from "react";
import { useInstanceParams } from "../../contexts/instance";
import { useShowError } from "../../../hooks/useShowError";
import { useConvertFieldInput } from "./useConvertFieldInput";

export function useSaveData() {
  const { field, entityName, instance } = useInstanceParams()
  const resolveRef = useRef<(value: unknown) => void>();
  const rejectRef = useRef<(reason?: any) => void>();
  const convert = useConvertFieldInput();
  const [post, { error }] = usePostOne(entityName, {
    onCompleted: (data: any) => {
      resolveRef.current && resolveRef.current(data)
    },
    onError: (err: Error) => {
      rejectRef.current && rejectRef.current(err)
    }
  })

  useShowError(error);

  const save = useCallback(() => {
    const p = new Promise((resolve, reject) => {
      resolveRef.current = resolve;
      rejectRef.current = reject;
      field.validate()
        .then(() => {
          post({ ...instance || {}, ...convert(field.value) || {} });
        })
        .catch((err: Error) => {
          reject(err)
        })
    });
    return p;
  }, [convert, field, instance, post])

  return save;
}