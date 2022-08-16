import { gql } from "awesome-graphql-client";
import { useMemo, useEffect, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { SYSTEM_APP_UUID } from "../../consts";
import { useQueryOne } from "../../enthooks/hooks/useQueryOne";
import { ClassMeta, StereoType } from "../../ModelBoard/meta/ClassMeta";
import { Meta } from "../../ModelBoard/meta/Meta";
import { useSelectedAppUuid } from "../../shared/AppRoot/context";
import { classesState, entitiesState, packagesState } from "../recoil";

export function useBuildMeta(): { error?: Error; loading?: boolean } {
  const appUuid = useSelectedAppUuid();
  const setEntitiesState = useSetRecoilState(entitiesState(appUuid));
  const setClasses = useSetRecoilState(classesState(appUuid));
  const setPackages = useSetRecoilState(packagesState(appUuid))

  const queryName = useMemo(() => "oneMeta", []);
  const queryGql = useMemo(() => {
    return gql`
    query ${queryName}($appUuid:String!) {
      ${queryName}(where:{
        _and:[
          {
            appUuid:{
              _eq:$appUuid
            }            
          },
          {
            status:{
              _eq:"published"
            }            
          },
        ]
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

  const makeEntity = useCallback((cls: ClassMeta) => {
    return {
      ...cls,
      associations: []
    }
  }, []);

  useEffect(() => {
    if (data && (systemData || appUuid === SYSTEM_APP_UUID)) {
      const meta = data[queryName];
      const systemMeta = systemData?.[queryName];
      const getPackage = (packageUuid: string) => {
        return systemMeta?.content?.packages?.find(pkg => pkg.uuid === packageUuid);
      }
      const systemPackages = systemMeta?.content?.packages?.filter(pkg => pkg.sharable) || [];
      const systemClasses = systemMeta?.content?.classes?.filter(cls => getPackage(cls.packageUuid).sharable) || []
      const allClasses = [...systemClasses, ...meta?.content?.classes || []];
      setPackages([...systemPackages, ...meta?.content?.packages || []]);
      setClasses(allClasses);
      setEntitiesState(allClasses.filter(cls => cls.stereoType === StereoType.Entity).map(cls => makeEntity(cls)) || [])
    }
  }, [data, queryName, setClasses, setPackages, systemData, appUuid, setEntitiesState, makeEntity]);

  return { error: error || systemError, loading: loading || systemLoading };
}
