import { useCallback } from "react";
import { IAppxAction } from "@rxdrag/plugin-sdk/model/action";
import { useDoOneAction } from "./useDoOneAction";

export function useDoActions() {
  const doOne = useDoOneAction();

  const doActions = useCallback(async (actions?: IAppxAction[]) => {
    for (const action of actions || []) {
      const variables = {};
      await doOne(action, variables);
    }
  }, [doOne])

  return doActions;
}