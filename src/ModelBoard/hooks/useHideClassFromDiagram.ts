import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ID } from "../../shared";
import { selectedDiagramState, x6NodesState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";

export function useHideClassFromDiagram(appUuid: ID) {
  const selectedDiagramUuid = useRecoilValue(selectedDiagramState(appUuid))
  const setNodes = useSetRecoilState(x6NodesState(appUuid));
  const backupSnapshot = useBackupSnapshot(appUuid);

  const hideClass = useCallback((classUuid: string) => {
    if (!selectedDiagramUuid) {
      return;
    }
    backupSnapshot();
    setNodes((nodes) => nodes.filter(
      (node) => {
        return !(node.id === classUuid && node.diagramUuid === selectedDiagramUuid)
      }
    ));
  }, [backupSnapshot, selectedDiagramUuid, setNodes]);

  return hideClass
}