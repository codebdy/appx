import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { useSelectedAppUuid } from "../../plugin-sdk/contexts/appRoot";
import { entitiesState } from "../recoil";

export function useGetPackageRootEntities() {
  const appUuid = useSelectedAppUuid();
  const entities = useRecoilValue(entitiesState(appUuid))

  const getPackageEntities = useCallback((packageUuid: string) => {
    return entities?.filter(entity => entity.packageUuid === packageUuid && entity.root) || [];
  }, [entities])

  return getPackageEntities;
}