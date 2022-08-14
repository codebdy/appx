import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },

  {
    title: 'Operation',
    key: 'pperation',
    width: 100,
    render: (_, record) => (
      <Space>
        <Button type="link">编辑</Button>
        <Button type="link">删除</Button>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const ResourcesTable = memo(() => {
  const [keyword, setKeyWord] = useState("");
  const { t } = useTranslation();
  const handleKeywordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyWord(event.target.value);
  }, [])

  return (
    <Table
      className="lang-resource-table"
      title={() => {
        return (
          <div className='table-toolbar'>
            <Input.Search className='search-input' allowClear onChange={handleKeywordChange} />
            <Button type="primary" icon={<PlusOutlined />}>{t("New")}</Button>
          </div>
        )
      }}
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  )
});

export default ResourcesTable;