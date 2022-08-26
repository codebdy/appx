import { useCallback } from "react";
import { IAppxAction } from "../model";
import { useDoOneAction } from "./useDoOneAction";

export function useDoActions() {
  const doOne = useDoOneAction();

  const doActions = useCallback(async (actions?: IAppxAction[]) => {
    for (const action of actions || []) {
      await doOne(action);
    }
  }, [doOne])

  return doActions;
}