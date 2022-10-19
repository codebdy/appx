import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { ID } from "~/shared";
import { RelationMeta } from "../meta/RelationMeta";
import { relationsState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";

export function useChangeRelation(appUuid: ID) {
  const backupSnapshot = useBackupSnapshot(appUuid);
  const setRelations = useSetRecoilState(relationsState(appUuid));

  const changeRelation = useCallback(
    (relation: RelationMeta) => {
      backupSnapshot();

      setRelations((relations) =>
        relations.map((rel) => (rel.uuid === relation.uuid ? relation : rel))
      );
    },
    [backupSnapshot, setRelations]
  );

  return changeRelation;
}
