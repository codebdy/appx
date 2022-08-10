import { useCallback } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { useDesingerKey } from "../../context";
import {
  isNavigationDirtyState,
  navigationNodesState,
  navigationRootNodeState,
  navigationSelectedIdState,
  redoListState,
  undoListState,
} from "../atoms";

export function useBackupSnapshot() {
  const key = useDesingerKey();
  const rootNode = useRecoilValue(navigationRootNodeState(key));
  const setIsDirty = useSetRecoilState(isNavigationDirtyState(key));
  const selectedId = useRecoilValue(navigationSelectedIdState(key));
  const nodes = useRecoilValue(navigationNodesState(key));
  const setUndoList = useSetRecoilState(undoListState(key));
  const setRedoList = useSetRecoilState(redoListState(key));

  const backup = useCallback(() => {
    setIsDirty(true);
    setUndoList((undoList) => [...undoList, { rootNode, nodes, selectedId }]);
    setRedoList([]);
  }, [nodes, rootNode, selectedId, setIsDirty, setRedoList, setUndoList]);
  return backup;
}
