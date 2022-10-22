import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { ID } from "~/shared";
import { classesState, relationsState, diagramsState, x6NodesState, x6EdgesState, packagesState, codesState } from "../recoil/atoms";
import { useClassPackage } from "./useClassPackage";

export function useGetMeta(appId: ID) {
  const packages = useRecoilValue(packagesState(appId))
  const classes = useRecoilValue(classesState(appId));
  const relations = useRecoilValue(relationsState(appId));
  const diagrams = useRecoilValue(diagramsState(appId));
  const codes = useRecoilValue(codesState(appId));
  const x6Nodes = useRecoilValue(x6NodesState(appId));
  const x6Edges = useRecoilValue(x6EdgesState(appId));
  const getPackage = useClassPackage(appId);

  const getMeta = useCallback(() => {
    const content = {
      packages,
      classes,
      relations,
      diagrams,
      codes,
      x6Nodes,
      x6Edges,
    };

    return content;
  }, [appId, classes, diagrams, codes, getPackage, packages, relations, x6Edges, x6Nodes]);

  return getMeta
}