import { useCallback } from "react";
import { IAppxAction } from "../model";

export function useDoActions() {
  const doActions = useCallback((actions?: IAppxAction[]) => {
    console.log("呵呵", actions)
  }, [])

  return doActions;
}