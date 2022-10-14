import { Table } from 'antd';
import React, { memo, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { useParseLangMessage } from '../../plugin-sdk';
import { packagesState } from '../../AppUml/recoil/atoms';
import { useEdittingAppUuid } from '../../hooks/useEdittingAppUuid';
import { useColumns } from './useColumns';
import { IAuthConfig, RowType } from './IAuthConfig';

const data: any = [
  {
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park',
      },
      {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [
          {
            key: 121,
            name: 'Jimmy Brown',
            age: 16,
            address: 'New York No. 3 Lake Park',
          },
        ],
      },
      {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [
          {
            key: 131,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park',
            children: [
              {
                key: 1311,
                name: 'Jim Green jr.',
                age: 25,
                address: 'London No. 3 Lake Park',
              },
              {
                key: 1312,
                name: 'Jimmy Green sr.',
                age: 18,
                address: 'London No. 4 Lake Park',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

export const ModelTable: React.FC = memo(() => {
  const p = useParseLangMessage();
  const columns = useColumns();
  const appUuid = useEdittingAppUuid();
  const packages = useRecoilValue(packagesState(appUuid));
  const data: IAuthConfig[] = useMemo(() => {
    return packages.map(pkg => {
      return {
        key: pkg.uuid,
        name: p(pkg.name),
        rowType: RowType.Package,
        children: [],
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
