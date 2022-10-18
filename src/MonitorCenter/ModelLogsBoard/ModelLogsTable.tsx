import { Table } from 'antd';
import React from 'react';
import { useColumns } from './useColumns';

interface DataType {
  key: React.Key;
  name: string;
  age: string;
  address: string;
  description: string;
}


const data: DataType[] = [
  {
    key: 1,
    name: 'John Brown',
    age: "Muataion",
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: "Muataion",
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Not Expandable',
    age: "Query",
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
  },
  {
    key: 4,
    name: 'Joe Black',
    age: "Query",
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
];

export const ModelLogsTable: React.FC = () => {
  const columns = useColumns()
  return (<Table
    columns={columns}
    expandable={{
      expandedRowRender: record => <p style={{ margin: 0 }}>{record.gql}</p>,
    }}
    dataSource={[]}
  />
  );
}

