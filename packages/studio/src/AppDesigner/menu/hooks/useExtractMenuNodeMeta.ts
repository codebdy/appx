import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { useGetMenuNode } from "./useGetMenuNode";
import { navigationNodesState } from "../atoms";
import { cloneObject } from "../utils/cloneObject";
import { useDesingerKey } from "../../context";
import { IMenuItem } from "../models/IMenuNode";

export function useExtractMenuNodeMeta() {
  const key = useDesingerKey();
  const nodes  = useRecoilValue(navigationNodesState(key));
  const getNode = useGetMenuNode();
  const extractNodeMeta = useCallback(
    (nodeId: string) => {
      const node = getNode(nodeId);
      if(!node){
        throw new Error("数据不完整, 找不到节点：" + nodeId);
      }

      const meta: IMenuItem = cloneObject(node.meta);
      meta.children = [];
      for (const childId of node.childIds) {
        const child = nodes?.find((nd) => nd.meta.uuid === childId);
        if (!child) {
          throw new Error("数据不完整, 找不到节点：" + childId);
        }
        meta.children.push(extractNodeMeta(child.meta.uuid));
      }
      return meta;
    },
    [getNode, nodes]
  );

  return extractNodeMeta;
}
