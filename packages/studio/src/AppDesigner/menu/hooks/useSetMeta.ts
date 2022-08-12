import {
  navigationNodesState,
  navigationRootNodeState,
} from "../atoms";

import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { useBackupSnapshot } from "./useBackupSnapshot";
import { IMenuItem } from "../models/IMenuNode";
import { useAppKey } from "../../../shared/AppRoot/context";

export function useSetMeta() {
  const key = useAppKey();
  const [rootNode, setRootNode] = useRecoilState(navigationRootNodeState(key));
  const [nodes, setNodes] = useRecoilState(navigationNodesState(key));
  const backupSnapshot = useBackupSnapshot();

  const setmeta = useCallback(
    (id: string, meta: IMenuItem) => {
      const node = nodes?.find((nd) => nd.meta.uuid === id);
      if (!node) {
        throw new Error("Can not finde node to set meta:" + id);
      }

      const newNode = { ...node, meta: meta };
      const parentNode = nodes?.find((nd) => nd.meta.uuid === newNode.parentId);
      if (!parentNode) {
        throw new Error(
          "Can not finde node parent to set meta:" + newNode.parentId
        );
      }

      backupSnapshot();

      const newParent = { ...parentNode };
      setRootNode(newParent.meta.uuid === rootNode?.meta.uuid ? newParent : rootNode);
      setNodes([
        ...nodes?.filter(
          (nd) => nd.meta.uuid !== newNode.meta.uuid && nd.meta.uuid !== newParent.meta.uuid
        ),
        newNode,
        newParent,
      ]);
    },
    [backupSnapshot, nodes, rootNode, setNodes, setRootNode]
  );

  return setmeta;
}
