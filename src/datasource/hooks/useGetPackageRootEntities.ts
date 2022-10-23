import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { useSelectedAppUuid } from "@rxdrag/plugin-sdk/contexts/appRoot";
import { entitiesState } from "../recoil";

export function useGetPackageRootEntities() {
  const appId = useSelectedAppUuid();
  const entities = useRecoilValue(entitiesState(appId))

  const getPackageEntities = useCallback((packageUuid: string) => {
    return entities?.filter(entity => entity.packageUuid === packageUuid && entity.root) || [];
  }, [entities])

  return getPackageEntities;
}