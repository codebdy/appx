import { useCallback } from "react";
import { IAppxAction } from "../model";
import {
  useField,
} from '@formily/react'
import { useInstanceId } from "../../contexts/instance";
export function useDoOneAction() {
  const field = useField();
  const id = useInstanceId();
  const doAction = useCallback((action: IAppxAction) => {
    return new Promise((resolve, reject) => {
      console.log("哈哈哈哈", field.path.toString(), id)
      resolve(undefined);
    })
  }, [field.path, id])

  return doAction;
}