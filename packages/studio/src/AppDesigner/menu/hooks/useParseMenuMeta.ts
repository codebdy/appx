import {
  navigationNodesState,
  navigationRootNodeState,
  navigationSelectedIdState,
} from "../atoms";
import _ from "lodash";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { IMenuItem, IMenuNode } from "../models/IMenuNode";

export const parseMeta = (
  meta: IMenuItem,
  nodes: IMenuNode[],
  parentId?: string
): IMenuNode => {
  const { children, ...metaData } = meta;
  const node: IMenuNode = {
    id: _.uniqueId(),
    parentId: parentId,
    childIds: [],
    meta: metaData,
  };
  for (const child of children || []) {
    const childNode = parseMeta(child, nodes, node.id);
    node.childIds.push(childNode.id);
  }
  nodes.push(node);
  return node;
};

export function useParseMenuMeta() {
  const setRootNode = useSetRecoilState(navigationRootNodeState);
  const setSelectedId = useSetRecoilState(navigationSelectedIdState);
  const setNodes = useSetRecoilState(navigationNodesState);
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
