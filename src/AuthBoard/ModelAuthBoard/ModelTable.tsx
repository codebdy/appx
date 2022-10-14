import { Table } from 'antd';
import React, { memo, useCallback, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { useParseLangMessage } from '../../plugin-sdk';
import { packagesState } from '../../AppUml/recoil/atoms';
import { useEdittingAppUuid } from '../../hooks/useEdittingAppUuid';
import { useColumns } from './useColumns';
import { IAuthConfig, RowType } from './IAuthConfig';
import { useGetPackageCanAuthClasses } from '../hooks/useGetPackageCanAuthClasses';
import { IClassAuthConfig, IProperyAuthConfig } from '../../model';
import { ID } from '../../shared';

export const ModelTable = memo((
  props: {
    classConfigs: IClassAuthConfig[],
    propertyConfigs: IProperyAuthConfig[],
    roleId: ID,
  }
) => {
  const { classConfigs, propertyConfigs, roleId } = props;
  const p = useParseLangMessage();
  const columns = useColumns(roleId);
  const appUuid = useEdittingAppUuid();
  const packages = useRecoilValue(packagesState(appUuid));
  const getClasses = useGetPackageCanAuthClasses(appUuid)
  const getClassConfig = useCallback((classUuid: string) => {
    return classConfigs.find(config => config.classUuid === classUuid && config.roleId === roleId);
  }, [classConfigs, roleId])

  const data: IAuthConfig[] = useMemo(() => {
    return packages.map(pkg => {
      return {
        key: pkg.uuid,
        name: p(pkg.name),
        rowType: RowType.Package,
        children: getClasses(pkg.uuid).map(cls => {
          const classConfig = getClassConfig(cls.uuid);
          return {
            key: cls.uuid,
            classUuid: cls.uuid,
            name: p(cls.label || cls.name),
            rowType: RowType.Class,
            classConfig: classConfig,
            children: classConfig?.expanded ? [] : undefined,
          }
        }),
      }
    }) || []
  }, [packages, getClassConfig])

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  );
});
