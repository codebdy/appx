import { gql } from "awesome-graphql-client";
import { useMemo, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useQueryOne } from "../../enthooks/hooks/useQueryOne";
import { Meta } from "../meta/Meta";
import { metaState, classesState, relationsState, diagramsState, x6NodesState, x6EdgesState, packagesState } from "../recoil/atoms";

export function useReadMeta(appUuid: string): { error?: Error; loading?: boolean } {
  const setMeta = useSetRecoilState(metaState(appUuid));
  const setEntities = useSetRecoilState(classesState(appUuid));
  const setRelations = useSetRecoilState(relationsState(appUuid));
  const setDiagrams = useSetRecoilState(diagramsState(appUuid));
  const setX6Nodes = useSetRecoilState(x6NodesState(appUuid));
  const setX6Edges = useSetRecoilState(x6EdgesState(appUuid));
  const setPackages = useSetRecoilState(packagesState(appUuid))

  const queryName = useMemo(() => "oneMeta", []);
  const queryGql = useMemo(() => {
    return gql`
    query ${queryName} {
      ${queryName}{
        id
        content
        status
      }
    }
  `;
  }, [queryName]);
  const { data, error, loading } = useQueryOne<Meta>(queryGql);

  useEffect(() => {
    if (data) {
      const meta = data[queryName];
      console.log("哈哈哈", meta?.content?.relations)

      setMeta(meta);
      setPackages(meta?.content?.packages || []);
      setEntities(meta?.content?.classes || []);
      setRelations(meta?.content?.relations || []);
      setDiagrams(meta?.content?.diagrams || []);
      setX6Nodes(meta?.content?.x6Nodes || []);
      setX6Edges(meta?.content?.x6Edges || []);
    }
  }, [data, queryName, setDiagrams, setEntities, setMeta, setPackages, setRelations, setX6Edges, setX6Nodes]);

  return { error, loading };
}
