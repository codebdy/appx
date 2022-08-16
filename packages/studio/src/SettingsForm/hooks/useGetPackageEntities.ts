import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { useSelectedAppUuid } from "../../shared/AppRoot/context";
import { entitiesState } from "../recoil/atoms";

export function useGetPackageEntities() {
  const appUuid = useSelectedAppUuid();
  const entities = useRecoilValue(entitiesState(appUuid))

  const getPackageEntities = useCallback((packageUuid: string) => {
    return entities?.filter(entity => entity.packageUuid === packageUuid) || [];
  }, [entities])

  return getPackageEntities;
}