import { useCallback } from "react";
import { IAppxAction } from "@rxdrag/plugin-sdk/model/action";
import { useDoOneAction } from "./useDoOneAction";

export function useDoActions() {
  const doOne = useDoOneAction();

  const doActions = useCallback(async (actions?: IAppxAction[]) => {
    const variables = {};
    for (const action of actions || []) {
      await doOne(action, variables);
    }
  }, [doOne])

  return doActions;
}