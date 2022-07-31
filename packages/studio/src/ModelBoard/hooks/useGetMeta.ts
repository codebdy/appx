import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { Meta, MetaStatus } from "../meta/Meta";
import { metaState, classesState, relationsState, diagramsState, x6NodesState, x6EdgesState, packagesState } from "../recoil/atoms";
import { useClassPackage } from "./useClassPackage";

export function useGetMeta(appUuid: string) {
  const meta = useRecoilValue(metaState(appUuid));
  const packages = useRecoilValue(packagesState(appUuid))
  const classes = useRecoilValue(classesState(appUuid));
  const relations = useRecoilValue(relationsState(appUuid));
  const diagrams = useRecoilValue(diagramsState(appUuid));
  const x6Nodes = useRecoilValue(x6NodesState(appUuid));
  const x6Edges = useRecoilValue(x6EdgesState(appUuid));
  const getPackage = useClassPackage(appUuid);

  const getMeta = useCallback(() => {
    const content = {
      packages: packages.filter(pkg => pkg.appUuid === appUuid),
      classes: classes.filter(cls=>getPackage(cls)?.appUuid === appUuid),
      relations,
      diagrams,
      x6Nodes,
      x6Edges,
    };

    const data: Meta =
      meta?.status === MetaStatus.META_STATUS_PUBLISHED || !meta
        ? {
          appUuid,
          content,
        }
        : {
          ...meta,
          content,
        };
    return data;
  }, [appUuid, classes, diagrams, getPackage, meta, packages, relations, x6Edges, x6Nodes]);

  return getMeta
}