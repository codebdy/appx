import { useCallback } from "react";
import { IMenuItem, useMe } from "~/plugin-sdk";
import { useAppParams } from "~/plugin-sdk/contexts/app";

export function useCheckMenuAuth() {
  const appParams = useAppParams();
  const me = useMe();
  const check = useCallback((item: IMenuItem) => {
    if (me.isSupper || me.isDemo) {
      return true;
    }
    for (const auth of appParams.menuAuthConfigs || []) {
      if (auth.menuItemUuid === item.uuid) {
        return !auth.refused
      }
    }

    return true;
  }, [appParams])

  return check;
}