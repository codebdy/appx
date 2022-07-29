import { useCallback, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { ID } from "../../shared";
import { RelationType } from "../meta/RelationMeta";
import { relationsState } from "../recoil/atoms";

export function useGetTargetRelations(appUuid: ID) {
  const relations = useRecoilValue(relationsState(appUuid));

  const getTargetRelations = useCallback((entityUuid: string,)=>{
    return relations.filter(
      (relation) =>
        relation.targetId === entityUuid &&
        relation.relationType !== RelationType.INHERIT
    );
  }, [relations])


  return getTargetRelations;
}
