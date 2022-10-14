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

export const ModelTable = memo((
  props: {
    classConfigs: IClassAuthConfig[],
    propertyConfigs: IProperyAuthConfig[],
  }
) => {
  const { classConfigs, propertyConfigs } = props;
  const p = useParseLangMessage();
  const columns = useColumns();
  const appUuid = useEdittingAppUuid();
  const packages = useRecoilValue(packagesState(appUuid));
  const getClasses = useGetPackageCanAuthClasses(appUuid)
  const getClassConfig = useCallback((classUuid: string) => {
    return classConfigs.find(config => config.classUuid === classUuid);
  }, [classConfigs])

  const data: IAuthConfig[] = useMemo(() => {
    return packages.map(pkg => {
      return {
        key: pkg.uuid,
        name: p(pkg.name),
        rowType: RowType.Package,
        children: getClasses(pkg.uuid).map(cls => {
          return {
            key: cls.uuid,
            name: p(cls.label || cls.name),
            rowType: RowType.Class,
            classConfig: getClassConfig(cls.uuid),
          }
        }),
      }
    }) || []
  }, [packages])
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  );
});
