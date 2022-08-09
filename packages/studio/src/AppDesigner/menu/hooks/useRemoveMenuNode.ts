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

export function useRemoveMenuNode() {
  const [rootNode, setRootNode] = useRecoilState(navigationRootNodeState);
  const setSelectedId = useSetRecoilState(navigationSelectedIdState);
  const setNodes = useSetRecoilState(navigationNodesState);
  const backupSnapshot = useBackupSnapshot();

  const getNode = useGetMenuNode();
  const remove = useCallback(
    (id: string) => {
      const node = getNode(id);
      if (!node) {
        console.error("Can node find node in useRemoveNode");
        return;
      }

      const parentNode = getNode(node.parentId || "");
      if (!parentNode) {
        //console.error("Can node find parent node in useRemoveNode");
        return;
      }

      backupSnapshot();

      let newRootNode = rootNode;
      const newParent: IMenuNode = {
        ...parentNode,
        childIds: parentNode.childIds.filter(
          (chilidId) => chilidId !== node.id
        ),
      };

      if (newParent.id === rootNode?.id) {
        newRootNode = newParent;
      }
      setNodes(
        (nodes) =>
          nodes
            ?.filter((nd) => nd.id !== node.id)
            .map((nd) => {
              if (nd.id === parentNode.id) {
                return newParent;
              }
              return nd;
            }) || []
      );
      setRootNode(newRootNode);
      setSelectedId(undefined);
    },
    [backupSnapshot, getNode, rootNode, setNodes, setRootNode, setSelectedId]
  );

  return remove;
}
