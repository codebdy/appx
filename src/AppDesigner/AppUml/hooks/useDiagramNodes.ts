import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { ID } from "~/shared";
import { x6NodesState } from "../recoil/atoms";

export function useDiagramNodes(diagramUuid:string, appUuid: ID){
  const nodes = useRecoilValue(x6NodesState(appUuid));

  const diagramNodes = useMemo(()=>{
    return nodes.filter(node=>node.diagramUuid === diagramUuid)
  }, [diagramUuid, nodes])

  return diagramNodes;
}