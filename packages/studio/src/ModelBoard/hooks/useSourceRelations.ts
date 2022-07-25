import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { ID } from "../../shared";
import { RelationType } from "../meta/RelationMeta";
import { relationsState } from "../recoil/atoms";

export function useSourceRelations(entityUuid: string, appId: ID) {
  const relations = useRecoilValue(relationsState(appId));

  const sourceRelations = useMemo(() => {
    return relations.filter(
      (relation) =>
        relation.sourceId === entityUuid &&
        relation.relationType !== RelationType.INHERIT
    );
  }, [entityUuid, relations]);

  return sourceRelations;
}
