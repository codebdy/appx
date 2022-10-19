import { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ID } from "~/shared";
import {
  classesState,
  relationsState,
  x6EdgesState,
  x6NodesState,
} from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";

export function useDeleteClass(appUuid: ID) {
  const setEntites = useSetRecoilState(classesState(appUuid));
  const [relations, setRelations] = useRecoilState(relationsState(appUuid));
  const setNodes = useSetRecoilState(x6NodesState(appUuid));
  const setEdges = useSetRecoilState(x6EdgesState(appUuid));

  const backupSnapshot = useBackupSnapshot(appUuid);

  const deleteClasses = useCallback(
    (classUuid: string) => {
      backupSnapshot();
      setEntites((clses) =>
        clses.filter((entity) => entity.uuid !== classUuid)
      );
      const relationIds = relations
        .filter(
          (relation) =>
            relation.sourceId === classUuid || relation.targetId === classUuid
        )
        .map((relation) => relation.uuid);
      setRelations((relations) =>
        relations.filter((relation) => !relationIds.find(uuid=>relation.uuid === uuid))
      );

      setNodes((nodes) => nodes.filter((node) => node.id !== classUuid));

      setEdges((edges) => edges.filter((edge) => !(edge.id in relationIds)));
    },
    [backupSnapshot, relations, setEdges, setEntites, setNodes, setRelations]
  );

  return deleteClasses;
}
