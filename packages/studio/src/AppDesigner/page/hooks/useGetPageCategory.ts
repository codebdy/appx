import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { useDesingerKey } from "../../context";
import { pageListNodesState } from "../recoil/atoms";
import { ListNodeType } from "../recoil/IListNode";

export function useGetPageCategory() {
  const key = useDesingerKey();
  const nodes = useRecoilValue(pageListNodesState(key))
  const getPageCategory = useCallback((pageId?: string) => {
    if (!pageId) {
      return undefined;
    }
    for (const node of nodes) {
      if (node.nodeType === ListNodeType.Category) {
        if (node.children?.find(id => id === pageId)) {
          return node;
        }
      }
    }
    return undefined;
  }, [nodes])

  return getPageCategory;
}