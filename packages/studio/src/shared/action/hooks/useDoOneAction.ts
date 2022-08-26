import { useCallback } from "react";
import { IAppxAction } from "../model";
import {
  useField,
} from '@formily/react'
export function useDoOneAction() {
  const field = useField();
  const doAction = useCallback((action: IAppxAction) => {
    return new Promise((resolve, reject) => {
      console.log("哈哈哈哈", field.path.toString())
      resolve(undefined);
    })
  }, [field.path])

  return doAction;
}