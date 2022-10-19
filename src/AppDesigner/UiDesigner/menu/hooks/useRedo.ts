import { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useAppViewKey } from "@rxdrag/plugin-sdk/contexts/appRoot"
import { isNavigationDirtyState, navigationNodesState, navigationRootNodeState, navigationSelectedIdState, redoListState, undoListState } from "../atoms";

export function useRedo() {
  const key = useAppViewKey();
  const setChanged = useSetRecoilState(isNavigationDirtyState(key));
  const setUndoList = useSetRecoilState(undoListState(key));
  const [reddoList, setRedoList] = useRecoilState(redoListState(key));
  const [rootNode, setRootNode] = useRecoilState(navigationRootNodeState(key));
  const [nodes, setNodes] = useRecoilState(navigationNodesState(key));
  const [selectedId, setSelectedId] = useRecoilState(navigationSelectedIdState(key));

  const redo = useCallback(() => {
    const snapshot = reddoList[reddoList.length - 1];
    setChanged(true);
    setUndoList((snapshots) => [
      ...snapshots,
      {
        rootNode,
        nodes,
        selectedId,
      },
    ]);
    setRedoList((snapshots) => snapshots.slice(0, snapshots.length - 1));
    setRootNode(snapshot.rootNode);
    setNodes(snapshot.nodes);
    setSelectedId(snapshot.selectedId);
  }, [nodes, reddoList, rootNode, selectedId, setChanged, setNodes, setRedoList, setRootNode, setSelectedId, setUndoList]);

  return {
    redoDisabled: reddoList.length === 0,
    redo
  }
}