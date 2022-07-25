import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { ID } from "../../shared";
import { RelationType } from "../meta/RelationMeta";
import { relationsState } from "../recoil/atoms";

export function useTargetRelations(entityUuid: string, appId: ID) {
  const relations = useRecoilValue(relationsState(appId));

  const targetRelations = useMemo(() => {
    return relations.filter(
      (relation) =>
        relation.targetId === entityUuid &&
        relation.relationType !== RelationType.INHERIT
    );
  }, [entityUuid, relations]);

  return targetRelations;
}
