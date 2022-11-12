import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { ID } from "~/shared";
import { codesState, diagramsState, x6EdgesState, x6NodesState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";

export function useDeleteCode(appId: ID) {
  const setCodes = useSetRecoilState(codesState(appId));

  const backupSnapshot = useBackupSnapshot(appId);

  const deleteDiagram = useCallback(
    (codeUuid: string) => {
      backupSnapshot();
      setCodes((codes) =>
        codes.filter((code) => code.uuid !== codeUuid)
      );
    },
    [backupSnapshot]
  );

  return deleteDiagram;
}
