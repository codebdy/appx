import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { useSelectedAppUuid } from "@rxdrag/plugin-sdk/contexts/appRoot";
import { entitiesState } from "../recoil";

export function useGetEntity() {
  const appId = useSelectedAppUuid();
  const entities = useRecoilValue(entitiesState(appId))

  const getEntity = useCallback((enitityUuid?: string) => {
    return entities.find(entity => entity.uuid === enitityUuid);
  }, [entities])

  return getEntity
}