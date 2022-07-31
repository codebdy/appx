import { gql } from "awesome-graphql-client";
import { useMemo, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useQueryOne } from "../../enthooks/hooks/useQueryOne";
import { Meta } from "../meta/Meta";
import { metaState, classesState, relationsState, diagramsState, x6NodesState, x6EdgesState, packagesState, SYSTEM_APP_UUID } from "../recoil/atoms";

export function useReadMeta(appUuid: string): { error?: Error; loading?: boolean } {
  const setMeta = useSetRecoilState(metaState(appUuid));
  const setClasses = useSetRecoilState(classesState(appUuid));
  const setRelations = useSetRecoilState(relationsState(appUuid));
  const setDiagrams = useSetRecoilState(diagramsState(appUuid));
  const setX6Nodes = useSetRecoilState(x6NodesState(appUuid));
  const setX6Edges = useSetRecoilState(x6EdgesState(appUuid));
  const setPackages = useSetRecoilState(packagesState(appUuid))

  const queryName = useMemo(() => "oneMeta", []);
  const queryGql = useMemo(() => {
    return gql`
    query ${queryName}($appUuid:String!) {
      ${queryName}(where:{
        appUuid:{
          _eq:$appUuid
        }
      }){
        id
        content
        status
      }
    }
  `;
  }, [queryName]);
  const { data, error, loading } = useQueryOne<Meta>(queryGql, { appUuid });
  const { data: systemData, error: systemError, loading: systemLoading } = useQueryOne<Meta>(queryGql, { appUuid: SYSTEM_APP_UUID });

  useEffect(() => {
    if (data) {
      const meta = data[queryName];
      setMeta(meta);
      setPackages((packages)=>([...packages, ...meta?.content?.packages || []]));
      setClasses((clses)=>([...clses, ...meta?.content?.classes || []]));
      setRelations(meta?.content?.relations || []);
      setDiagrams(meta?.content?.diagrams || []);
      setX6Nodes(meta?.content?.x6Nodes || []);
      setX6Edges(meta?.content?.x6Edges || []);
    }
  }, [data, queryName, setDiagrams, setClasses, setMeta, setPackages, setRelations, setX6Edges, setX6Nodes]);

  useEffect(()=>{
    if(systemData){
      const meta = systemData[queryName];
      setPackages((packages)=>([...meta?.content?.packages?.filter(pkg=>pkg.sharable) || [], ...packages]));
      setClasses((clses)=>([ ...meta?.content?.classes || [], ...clses]));
    }
  },[queryName, setClasses, setPackages, systemData] )

  return { error:error||systemError, loading:loading ||systemLoading };
}
