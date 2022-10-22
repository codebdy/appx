import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { classesState, relationsState, diagramsState, x6NodesState, x6EdgesState, packagesState, codesState } from "../recoil/atoms";
import { useClassPackage } from "./useClassPackage";

export function useGetMeta(appUuid: string) {
  const packages = useRecoilValue(packagesState(appUuid))
  const classes = useRecoilValue(classesState(appUuid));
  const relations = useRecoilValue(relationsState(appUuid));
  const diagrams = useRecoilValue(diagramsState(appUuid));
  const codes = useRecoilValue(codesState(appUuid));
  const x6Nodes = useRecoilValue(x6NodesState(appUuid));
  const x6Edges = useRecoilValue(x6EdgesState(appUuid));
  const getPackage = useClassPackage(appUuid);

  const getMeta = useCallback(() => {
    const content = {
      packages: packages.filter(pkg => pkg.appUuid === appUuid),
      classes: classes.filter(cls=>getPackage(cls)?.appUuid === appUuid),
      relations,
      diagrams,
      codes,
      x6Nodes,
      x6Edges,
    };

    return content;
  }, [appUuid, classes, diagrams, codes, getPackage, packages, relations, x6Edges, x6Nodes]);

  return getMeta
}