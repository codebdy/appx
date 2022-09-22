import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { ID } from "../../shared";
import { RelationMeta, RelationType } from "../meta/RelationMeta";
import { relationsState } from "../recoil/atoms";

export interface Association {
  name: string;
  relation: RelationMeta;
}

export function useGetClassAssociations(appUuid: ID) {
  const relations = useRecoilValue(relationsState(appUuid));

  const getClassAssociations = useCallback(
    (classUuid: string) => {
      const associations: Association[] = [];
      for (const relation of relations) {
        if (
          relation.relationType === RelationType.INHERIT ||
          relation.relationType === RelationType.LINK_LINE
        ) {
          continue;
        }
        if (relation.sourceId === classUuid) {
          associations.push({ name: relation.roleOfTarget || "", relation });
        } else if (relation.targetId === classUuid) {
          associations.push({ name: relation.roleOfSource || "", relation });
        }
      }
      return associations;
    },
    [relations]
  );

  return getClassAssociations;
}
