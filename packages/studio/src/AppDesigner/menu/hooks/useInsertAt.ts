import {
  navigationNodesState,
  navigationRootNodeState,
  navigationSelectedIdState,
} from "../atoms";
import { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { IMenuNode } from "../models/IMenuNode";
import { useBackupSnapshot } from "./useBackupSnapshot";
import { useGetMenuNode } from "./useGetMenuNode";

export function useInsertAt() {
  const [rootNode, setRootNode] = useRecoilState(navigationRootNodeState);
  const setSelectedId = useSetRecoilState(navigationSelectedIdState);
  const [nodes, setNodes] = useRecoilState(navigationNodesState);
  const getNode = useGetMenuNode();
  const backupSnapshot = useBackupSnapshot();

  const insertAt = useCallback(
    (node: IMenuNode, targetNodeId: string, index: number) => {
      setSelectedId(node.id);
      const newNode = { ...node };
      let newNodes = [...nodes];
      let newRootNode = rootNode;
      const targetNode = getNode(targetNodeId);
      if (!targetNode) {
        throw new Error("Target node not exist:" + targetNodeId);
      }

      const parentNode = getNode(node.parentId || "") || rootNode;
      if (!parentNode) {
        console.error("Can node find parent node in useInsertAt");
        return [];
      }

      backupSnapshot();

      const newParent: IMenuNode = {
        ...parentNode,
        childIds: parentNode.childIds.filter(
          (chilidId) => chilidId !== node.id
        ),
      };

      newNodes = [
        ...(newNodes?.filter((nd) => nd.id !== newParent.id) || []),
        newParent,
      ];

      if (newParent.id === rootNode?.id) {
        newRootNode = newParent;
      }

      const newTargetNode: IMenuNode =
        targetNode.id === newParent.id
          ? { ...newParent, childIds: [...newParent.childIds] }
          : { ...targetNode, childIds: [...targetNode.childIds] };

      newNodes = [
        ...(newNodes?.filter((nd) => nd.id !== newTargetNode.id) || []),
        newTargetNode,
      ];

      if (newTargetNode.id === rootNode?.id) {
        newRootNode = newTargetNode;
      }

      newNode.parentId = newTargetNode.id;
      newTargetNode.childIds.splice(index, 0, newNode.id);

      newNodes = [
        ...(newNodes?.filter((nd) => nd.id !== newNode.id) || []),
        newNode,
      ];

      setRootNode(newRootNode);
      setNodes(newNodes);
    },
    [
      backupSnapshot,
      getNode,
      nodes,
      rootNode,
      setNodes,
      setRootNode,
      setSelectedId,
    ]
  );

  return insertAt;
}
