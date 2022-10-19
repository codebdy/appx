import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { ID } from "../../shared";
import { relationsState, x6EdgesState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";

export function useDeleteRelation(appUuid: ID) {
  const setRelation = useSetRecoilState(relationsState(appUuid));
  const setEdges = useSetRecoilState(x6EdgesState(appUuid));

  const backupSnapshot = useBackupSnapshot(appUuid);

  const deleteRelation = useCallback(
    (uuid: string) => {
      backupSnapshot();
      setRelation((relations) =>
        relations.filter((relation) => relation.uuid !== uuid)
      );
      setEdges((edges) => edges.filter((edge) => edge.id !== uuid));
    },
    [backupSnapshot, setEdges, setRelation]
  );

  return deleteRelation;
}
