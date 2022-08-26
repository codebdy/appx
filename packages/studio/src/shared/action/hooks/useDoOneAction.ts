import { useCallback } from "react";
import { IAppxAction } from "../model";

export function useDoOneAction() {
  const doAction = useCallback((action: IAppxAction) => {
    return new Promise((resolve, reject) => {
      console.log("哈哈哈哈", action)
      resolve(undefined);
    })
  }, [])

  return doAction;
}