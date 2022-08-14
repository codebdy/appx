import { gql } from "awesome-graphql-client";
import { useMemo, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { SYSTEM_APP_UUID } from "../../consts";
import { useQueryOne } from "../../enthooks/hooks/useQueryOne";
import { Meta } from "../meta/Meta";
import { metaState, classesState, relationsState, diagramsState, x6NodesState, x6EdgesState, packagesState } from "../recoil/atoms";

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
  const { data, error, loading } = useQueryOne<Meta>(
    {
      gql: queryGql,
      params: { appUuid }
    }

  );
  const { data: systemData, error: systemError, loading: systemLoading } = useQueryOne<Meta>(
    {
      gql: appUuid !== SYSTEM_APP_UUID ? queryGql : undefined,
      params: { appUuid: SYSTEM_APP_UUID }
    }

  );

  useEffect(() => {
    if (data && (systemData || appUuid === SYSTEM_APP_UUID)) {
      const meta = data[queryName];
      const systemMeta = systemData?.[queryName];
      const getPackage = (packageUuid: string) => {
        return systemMeta?.content?.packages?.find(pkg => pkg.uuid === packageUuid);
      }
      const systemPackages = systemMeta?.content?.packages?.filter(pkg => pkg.sharable) || [];
      const systemClasses = systemMeta?.content?.classes?.filter(cls => getPackage(cls.packageUuid).sharable) || []
      setMeta(meta);
      setPackages([...systemPackages, ...meta?.content?.packages || []]);
      setClasses([...systemClasses, ...meta?.content?.classes || []]);
      setRelations(meta?.content?.relations || []);
      setDiagrams(meta?.content?.diagrams || []);
      setX6Nodes(meta?.content?.x6Nodes || []);
      setX6Edges(meta?.content?.x6Edges || []);
    }
  }, [data, queryName, setDiagrams, setClasses, setMeta, setPackages, setRelations, setX6Edges, setX6Nodes, systemData, appUuid]);

  return { error: error || systemError, loading: loading || systemLoading };
}
