import { Button, Table, Tag } from 'antd';
import React, { useMemo } from 'react';
import { useProTableParams } from '../context';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Chinese Score',
    dataIndex: 'chinese',
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: 'Math Score',
    dataIndex: 'math',
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    title: 'English Score',
    dataIndex: 'english',
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: '操作',
    key: 'action',
    render: () =>
      <>
        <Button type="link" size='small'>编辑</Button>
        <Button type="link" size='small'>删除</Button>
      </>
    ,
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    chinese: 98,
    math: 60,
    english: 70,
    tags: ['cool', 'teacher'],
  },
  {
    key: '2',
    name: 'Jim Green',
    chinese: 98,
    math: 66,
    english: 89,
    tags: ['cool',],
  },
  {
    key: '3',
    name: 'Joe Black',
    chinese: 98,
    math: 90,
    english: 70,
    tags: ['cool', 'teacher'],
  },
  {
    key: '4',
    name: 'Jim Red',
    chinese: 88,
    math: 99,
    english: 89,
    tags: ['teacher'],
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

// rowSelection object indicates the need for row selection


const QueryTable = () => {
  const {onSelectedChange} = useProTableParams();
  const rowSelection = useMemo(() => ({
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      onSelectedChange(selectedRowKeys);
      //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: any) => ({
      //disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  }), [onSelectedChange]);


  return (<Table
    columns={columns}
    dataSource={data}
    rowSelection={{
      type: 'checkbox',
      ...rowSelection,
    }}
    onChange={onChange} />
  )

};

export default QueryTable;