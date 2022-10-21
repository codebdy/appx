import { gql, GraphQLRequestError } from "~/enthooks";
import { useMemo, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { SYSTEM_APP_ID } from "~/consts";
import { useQueryOne } from "~/enthooks/hooks/useQueryOne";
import { Meta } from "../meta/Meta";
import { metaState, classesState, relationsState, diagramsState, x6NodesState, x6EdgesState, packagesState, codesState } from "../recoil/atoms";

export function useReadMeta(appUuid: string): { error?: GraphQLRequestError; loading?: boolean } {
  const setMeta = useSetRecoilState(metaState(appUuid));
  const setClasses = useSetRecoilState(classesState(appUuid));
  const setRelations = useSetRecoilState(relationsState(appUuid));
  const setDiagrams = useSetRecoilState(diagramsState(appUuid));
  const setCodes = useSetRecoilState(codesState(appUuid));
  const setX6Nodes = useSetRecoilState(x6NodesState(appUuid));
  const setX6Edges = useSetRecoilState(x6EdgesState(appUuid));
  const setPackages = useSetRecoilState(packagesState(appUuid))

  const queryName = useMemo(() => "oneMeta", []);
  const queryGql = useMemo(() => {
    return gql`
    query ${queryName}($appUuid:String!) {
      ${queryName}(
        where:{
            appUuid:{
            _eq:$appUuid
          }
        },
        orderBy:[
          {
            id:desc
          }
        ]
      ){
        id
        content
        status
      }
    }
  `;
  }, [queryName]);

  const input = useMemo(() => ({
    gql: queryGql,
    params: { appUuid }
  }), [appUuid, queryGql])

  const { data, error, loading } = useQueryOne<Meta>(input);

  const systemInput = useMemo(() => (
    {
      gql: appUuid !== SYSTEM_APP_ID ? queryGql : undefined,
      params: { appUuid: SYSTEM_APP_ID }
    }
  ), [appUuid, queryGql])
  const { data: systemData, error: systemError, loading: systemLoading } = useQueryOne<Meta>(systemInput);

  useEffect(() => {
    if (data && (systemData || appUuid === SYSTEM_APP_ID)) {
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
      setCodes(meta?.content?.codes || []);
      setDiagrams(meta?.content?.diagrams || []);
      setX6Nodes(meta?.content?.x6Nodes || []);
      setX6Edges(meta?.content?.x6Edges || []);
    }
  }, [
    data,
    queryName,
    setCodes,
    setDiagrams,
    setClasses,
    setMeta,
    setPackages,
    setRelations,
    setX6Edges,
    setX6Nodes,
    systemData,
    appUuid
  ]);

  return { error: error || systemError, loading: loading || systemLoading };
}