import { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useDesignerViewKey } from "~/plugin-sdk/contexts/desinger"
import { isNavigationDirtyState, navigationNodesState, navigationRootNodeState, navigationSelectedIdState, redoListState, undoListState } from "../atoms";

export function useUndo() {
  const key = useDesignerViewKey();
  const setChanged = useSetRecoilState(isNavigationDirtyState(key));
  const [undoList, setUndoList] = useRecoilState(undoListState(key));
  const setRedoList = useSetRecoilState(redoListState(key));
  const [rootNode, setRootNode] = useRecoilState(navigationRootNodeState(key));
  const [nodes, setNodes] = useRecoilState(navigationNodesState(key));
  const [selectedId, setSelectedId] = useRecoilState(navigationSelectedIdState(key));

  const undo = useCallback(() => {
    const snapshot = undoList[undoList.length - 1];
    setChanged(true);
    setRedoList((snapshots) => [
      ...snapshots,
      {
        rootNode,
        nodes,
        selectedId,
      },
    ]);
    setUndoList((snapshots) => snapshots.slice(0, snapshots.length - 1));
    setRootNode(snapshot.rootNode);
    setNodes(snapshot.nodes);
    setSelectedId(snapshot.selectedId);
  }, [nodes, rootNode, selectedId, setChanged, setNodes, setRedoList, setRootNode, setSelectedId, setUndoList, undoList]);

  return {
    undoDisabled: undoList.length === 0,
    undo
  }
}