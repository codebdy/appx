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
import { useDesingerKey } from "../../context";

export function useRemoveMenuNode() {
  const key = useDesingerKey();
  const [rootNode, setRootNode] = useRecoilState(navigationRootNodeState(key));
  const setSelectedId = useSetRecoilState(navigationSelectedIdState(key));
  const setNodes = useSetRecoilState(navigationNodesState(key));
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
          (chilidId) => chilidId !== node.meta.uuid
        ),
      };

      if (newParent.meta.uuid === rootNode?.meta.uuid) {
        newRootNode = newParent;
      }
      setNodes(
        (nodes) =>
          nodes
            ?.filter((nd) => nd.meta.uuid !== node.meta.uuid)
            .map((nd) => {
              if (nd.meta.uuid === parentNode.meta.uuid) {
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
