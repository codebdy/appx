import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';

interface DataType {
  key: React.Key;
  name: string;
  age: string;
  address: string;
  description: string;
}

const columns: ColumnsType<DataType> = [
  { title: '用户', dataIndex: 'name', key: 'name' },
  { title: 'IP', dataIndex: 'ip', key: 'ip' },
  { title: '实体', dataIndex: 'address', key: 'address' },
  { title: '操作类型', dataIndex: 'age', key: 'age' },
  { title: '操作结果', dataIndex: 'result', key: 'result' },
  {
    title: '日期',
    dataIndex: '',
    key: 'x',
  },
];

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

export const ModelLogsTable: React.FC = () => (
  <Table
    columns={columns}
    expandable={{
      expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
      rowExpandable: record => record.name !== 'Not Expandable',
    }}
    dataSource={data}
  />
);
