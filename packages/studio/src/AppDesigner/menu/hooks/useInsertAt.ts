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
import { useAppKey } from "../../../shared/AppRoot/context";

export function useInsertAt() {
  const key = useAppKey();
  const [rootNode, setRootNode] = useRecoilState(navigationRootNodeState(key));
  const setSelectedId = useSetRecoilState(navigationSelectedIdState(key));
  const [nodes, setNodes] = useRecoilState(navigationNodesState(key));
  const getNode = useGetMenuNode();
  const backupSnapshot = useBackupSnapshot();

  const insertAt = useCallback(
    (node: IMenuNode, targetNodeId: string, index: number) => {
      setSelectedId(node.meta.uuid);
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
          (chilidId) => chilidId !== node.meta.uuid
        ),
      };

      newNodes = [
        ...(newNodes?.filter((nd) => nd.meta.uuid !== newParent.meta.uuid) || []),
        newParent,
      ];

      if (newParent.meta.uuid === rootNode?.meta.uuid) {
        newRootNode = newParent;
      }

      const newTargetNode: IMenuNode =
        targetNode.meta.uuid === newParent.meta.uuid
          ? { ...newParent, childIds: [...newParent.childIds] }
          : { ...targetNode, childIds: [...targetNode.childIds] };

      newNodes = [
        ...(newNodes?.filter((nd) => nd.meta.uuid !== newTargetNode.meta.uuid) || []),
        newTargetNode,
      ];

      if (newTargetNode.meta.uuid === rootNode?.meta.uuid) {
        newRootNode = newTargetNode;
      }

      newNode.parentId = newTargetNode.meta.uuid;
      newTargetNode.childIds.splice(index, 0, newNode.meta.uuid);

      newNodes = [
        ...(newNodes?.filter((nd) => nd.meta.uuid !== newNode.meta.uuid) || []),
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
