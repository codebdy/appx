import {
  navigationNodesState,
  navigationRootNodeState,
  navigationSelectedIdState,
} from "../atoms";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { IMenuItem, IMenuNode } from "../models/IMenuNode";
import { useAppKey } from "../../../shared/AppRoot/context";

export const parseMeta = (
  meta: IMenuItem,
  nodes: IMenuNode[],
  parentId?: string
): IMenuNode => {
  const { children, ...metaData } = meta;
  const node: IMenuNode = {
    parentId: parentId,
    childIds: [],
    meta: metaData,
  };
  for (const child of children || []) {
    const childNode = parseMeta(child, nodes, node.meta.uuid);
    node.childIds.push(childNode.meta.uuid);
  }
  nodes.push(node);
  return node;
};

export function useParseMenuMeta() {
  const key = useAppKey();
  const setRootNode = useSetRecoilState(navigationRootNodeState(key));
  const setSelectedId = useSetRecoilState(navigationSelectedIdState(key));
  const setNodes = useSetRecoilState(navigationNodesState(key));
  const parse = useCallback(
    (meta: IMenuItem, parentId?: string) => {
      const pasedNodes: IMenuNode[] = [];
      const node = parseMeta(meta, pasedNodes, parentId);
      setSelectedId(undefined);
      setNodes((nodes) => [...nodes, ...pasedNodes]);
      setRootNode(node);
      return node;
    },
    [setNodes, setRootNode, setSelectedId]
  );
  return parse;
}
