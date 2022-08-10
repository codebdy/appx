import {
  navigationNodesState,
  navigationRootNodeState,
} from "../atoms";

import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { useBackupSnapshot } from "./useBackupSnapshot";
import { IMenuItem } from "../models/IMenuNode";
import { useDesingerKey } from "../../context";

export function useSetMeta() {
  const key = useDesingerKey();
  const [rootNode, setRootNode] = useRecoilState(navigationRootNodeState(key));
  const [nodes, setNodes] = useRecoilState(navigationNodesState(key));
  const backupSnapshot = useBackupSnapshot();

  const setmeta = useCallback(
    (id: string, meta: IMenuItem) => {
      const node = nodes?.find((nd) => nd.id === id);
      if (!node) {
        throw new Error("Can not finde node to set meta:" + id);
      }

      const newNode = { ...node, meta: meta };
      const parentNode = nodes?.find((nd) => nd.id === newNode.parentId);
      if (!parentNode) {
        throw new Error(
          "Can not finde node parent to set meta:" + newNode.parentId
        );
      }

      backupSnapshot();

      const newParent = { ...parentNode };
      setRootNode(newParent.id === rootNode?.id ? newParent : rootNode);
      setNodes([
        ...nodes?.filter(
          (nd) => nd.id !== newNode.id && nd.id !== newParent.id
        ),
        newNode,
        newParent,
      ]);
    },
    [backupSnapshot, nodes, rootNode, setNodes, setRootNode]
  );

  return setmeta;
}
