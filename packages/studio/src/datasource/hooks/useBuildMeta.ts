import { gql } from "awesome-graphql-client";
import { useMemo, useEffect, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { SYSTEM_APP_UUID } from "../../consts";
import { useQueryOne } from "../../enthooks/hooks/useQueryOne";
import { AttributeMeta } from "../../ModelBoard/meta/AttributeMeta";
import { ClassMeta, StereoType } from "../../ModelBoard/meta/ClassMeta";
import { Meta } from "../../ModelBoard/meta/Meta";
import { MethodMeta } from "../../ModelBoard/meta/MethodMeta";
import { RelationMeta, RelationType } from "../../ModelBoard/meta/RelationMeta";
import { useSelectedAppUuid } from "../../shared/AppRoot/context";
import { classesState, entitiesState, packagesState } from "../recoil";
import _ from "lodash";
import { AssociationMeta } from "../model";

export const sort = (array: { name: string }[]) => {
  return array.sort((a, b) => {
    //忽略大小写
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    //name相等时
    return 0;
  }) as any
}

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

  const getParentClasses = useCallback((classUuid: string, classMetas: ClassMeta[], relations: RelationMeta[]) => {
    const classes: ClassMeta[] = [];
    for (const relation of relations) {
      if (relation.relationType === RelationType.INHERIT) {
        if (relation.sourceId === classUuid) {
          const parent = classMetas.find(cls => cls.uuid === relation.targetId)
          if (parent) {
            classes.push(parent);
            const parentsOfParent = getParentClasses(parent.uuid, classMetas, relations);
            classes.push(...parentsOfParent)
          }
        }
      }
    }
    return classes;
  }, [])

  const getEntityAssociations = useCallback((classUuid: string, classMetas: ClassMeta[], relations: RelationMeta[]) => {
    const associations: AssociationMeta[] = [];
    for (const relation of relations) {
      if (relation.relationType === RelationType.INHERIT) {
        continue;
      }

      if (!classMetas.find(cls => cls.uuid === relation.targetId) || !classMetas.find(cls => cls.uuid === relation.sourceId)) {
        continue;
      }

      if (relation.sourceId === classUuid) {
        associations.push({
          name: relation.roleOfTarget,
          label: relation.labelOfTarget,
          tyeEntityUuid: relation.targetId,
        })
      } else if (relation.targetId === classUuid) {
        associations.push({
          name: relation.roleOfSource,
          label: relation.labelOfSource,
          tyeEntityUuid: relation.sourceId,
        })
      }
    }
    return associations;
  }, [])


  const makeEntity = useCallback((cls: ClassMeta, classMetas: ClassMeta[], relations: RelationMeta[]) => {
    const parentClasses = getParentClasses(cls.uuid, classMetas, relations);
    const parentAttributes: AttributeMeta[] = [];
    const parentMethods: MethodMeta[] = [];

    for (const parentCls of parentClasses) {
      parentAttributes.push(...parentCls.attributes || []);
      parentMethods.push(...parentCls.methods || []);
    }

    return {
      ...cls,
      attributes: sort(_.uniqBy([...cls.attributes || [], ...parentAttributes], "name")),
      methods: sort(_.uniqBy([...cls.methods || [], ...parentMethods], "name")),
      associations: getEntityAssociations(cls.uuid, classMetas, relations)
    }
  }, [getEntityAssociations, getParentClasses]);

  useEffect(() => {
    if (data && (systemData || appUuid === SYSTEM_APP_UUID)) {
      const meta = data[queryName];
      const systemMeta = systemData?.[queryName];
      const getPackage = (packageUuid: string) => {
        return systemMeta?.content?.packages?.find(pkg => pkg.uuid === packageUuid);
      }
      const systemPackages = systemMeta?.content?.packages?.filter(pkg => pkg.sharable) || [];
      const systemClasses = systemMeta?.content?.classes?.filter(cls => getPackage(cls.packageUuid).sharable) || []
      const allClasses: ClassMeta[] = [...systemClasses, ...meta?.content?.classes || []];
      const allRelations: RelationMeta[] = [...systemMeta?.content?.relations, ...meta?.content?.relations];
      setPackages([...systemPackages, ...meta?.content?.packages || []]);
      setClasses(allClasses);
      setEntitiesState(
        sort(
          allClasses.filter(
            cls => cls.stereoType === StereoType.Entity
          ).map(
            cls => makeEntity(
              cls,
              allClasses,
              allRelations
            )
          ) || []
        )
      )
    }
  }, [data, queryName, setClasses, setPackages, systemData, appUuid, setEntitiesState, makeEntity]);

  return { error: error || systemError, loading: loading || systemLoading };
}
