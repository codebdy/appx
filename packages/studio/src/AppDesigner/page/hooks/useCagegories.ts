import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { useDesingerKey } from "../../context";
import { pageListNodesState } from "../recoil/atoms";
import { ListNodeType } from "../recoil/IListNode";

export function useCagegories(){
  const key = useDesingerKey();
  const nodes = useRecoilValue(pageListNodesState(key))

  const categories = useMemo(()=>{
    return nodes.filter(node=>node.nodeType === ListNodeType.Category)
  }, [nodes])

  return categories
}