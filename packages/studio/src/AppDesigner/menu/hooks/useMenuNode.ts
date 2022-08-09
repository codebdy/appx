import { useMemo } from "react";
import { useGetMenuNode } from "./useGetMenuNode";

export function useMenuNode(id?: string){
  const getNode = useGetMenuNode();
  const node = useMemo(()=> getNode(id||''), [getNode, id]);

  return node;
}