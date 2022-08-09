import { useCallback } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  isNavigationDirtyState,
  navigationNodesState,
  navigationRootNodeState,
  navigationSelectedIdState,
  redoListState,
  undoListState,
} from "../atoms";

export function useBackupSnapshot() {
  const rootNode = useRecoilValue(navigationRootNodeState);
  const setIsDirty = useSetRecoilState(isNavigationDirtyState);
  const selectedId = useRecoilValue(navigationSelectedIdState);
  const nodes = useRecoilValue(navigationNodesState);
  const setUndoList = useSetRecoilState(undoListState);
  const setRedoList = useSetRecoilState(redoListState);

  const backup = useCallback(() => {
    setIsDirty(true);
    setUndoList((undoList) => [...undoList, { rootNode, nodes, selectedId }]);
    setRedoList([]);
  }, [nodes, rootNode, selectedId, setIsDirty, setRedoList, setUndoList]);
  return backup;
}
