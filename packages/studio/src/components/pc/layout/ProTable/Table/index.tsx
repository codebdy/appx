import { Button, Table as AntdTable, TableProps, Tag } from 'antd';
import React, { memo, useCallback, useMemo } from 'react';
import { useProTableParams, useSelectable } from '../context';
import { ArrayBase } from "@formily/antd"
import {
  useField,
  useFieldSchema,
  RecursionField,
} from '@formily/react'

import { GeneralField, FieldDisplayTypes, ArrayField } from '@formily/core'
import { ColumnProps } from "antd/lib/table"
import { Schema } from '@formily/json-schema'
import { usePrefixCls } from "@formily/antd/esm/__builtins__"
import { isArr } from '@formily/shared'
import { useParseLangMessage } from '../../../../../hooks/useParseLangMessage';

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

interface ObservableColumnSource {
  field: GeneralField
  columnProps: ColumnProps<any>
  schema: Schema
  display: FieldDisplayTypes
  name: string
}

const isColumnComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('Column') > -1
}


// rowSelection object indicates the need for row selection
const useArrayTableColumns = (
  dataSource: any[],
  sources: ObservableColumnSource[]
): TableProps<any>['columns'] => {
  return sources?.reduce((buf, { name, columnProps, schema, display }, key) => {
    if (display !== 'visible') return buf
    if (!isColumnComponent(schema)) return buf
    return buf.concat({
      ...columnProps,
      key,
      dataIndex: name,
      render: (value: any, record: any) => {
        const index = dataSource.indexOf(record)
        const children = (
          <ArrayBase.Item index={index} record={() => dataSource[index]}>
            <RecursionField schema={schema} name={index} onlyRenderProperties />
          </ArrayBase.Item>
        )
        return children
      },
    })
  }, [])
}

const useArrayTableSources = () => {
  const arrayField = useField()
  const schema = useFieldSchema()
  const parseSources = (schema: Schema): ObservableColumnSource[] => {
    if (
      isColumnComponent(schema) ||
      isOperationsComponent(schema) ||
      isAdditionComponent(schema)
    ) {
      if (!schema['x-component-props']?.['dataIndex'] && !schema['name'])
        return []
      const name = schema['x-component-props']?.['dataIndex'] || schema['name']
      const field = arrayField.query(arrayField.address.concat(name)).take()
      const columnProps =
        field?.component?.[1] || schema['x-component-props'] || {}
      const display = field?.display || schema['x-display']
      return [
        {
          name,
          display,
          field,
          schema,
          columnProps,
        },
      ]
    } else if (schema.properties) {
      return schema.reduceProperties((buf, schema) => {
        return buf.concat(parseSources(schema))
      }, [])
    }
  }

  const parseArrayItems = (schema: Schema['items']) => {
    if (!schema) return []
    const sources: ObservableColumnSource[] = []
    const items = isArr(schema) ? schema : [schema]
    return items.reduce((columns, schema) => {
      const item = parseSources(schema)
      if (item) {
        return columns.concat(item)
      }
      return columns
    }, sources)
  }

  if (!schema) throw new Error('can not found schema object')

  return parseArrayItems(schema.items)
}
export const Table = memo((
  props: TableProps<any>
) => {
  const { onSelectedChange } = useProTableParams();
  const selectable = useSelectable();
  const p = useParseLangMessage();
  console.log("cmcmc", props)
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

  const renderColumn = useCallback((node: any) => {
    const props = node.props?.['x-component-props'] || {}
    const children = node.children;
    return (
      <AntdTable.Column
        {...props}
        title={
          <div>
            {p(props?.title)}
          </div>
        }
        dataIndex={node.id}
        className={`data-id:${node.id}`}
        render={(value, record, key) => {
          return (
            <ArrayBase.Item key={key} index={key} record={null}>
              {/* {(children as any)?.length
                ?
                children?.map(child => {
                  return <TreeNodeWidget node={child} />
                })
                : 'Droppable'
              } */}
            </ArrayBase.Item>
          )
        }}
      />
    )
  }, [p]);

  const renderColumnGroup = useCallback((node: any) => {
    const props = node.props?.['x-component-props'] || {}
    const children = node.children;
    return (<AntdTable.ColumnGroup
      {...props}
      title={
        <div>
          {p(props?.title)}
        </div>
      }
      dataIndex={node.id}
      className={`data-id:${node.id}`}
    >
      {
        children?.map(child => {
          const isGroup = child.props?.['x-component'] === "ProTable.ColumnGroup";
          if (isGroup) {
            return renderColumnGroup(child)
          } else {
            return renderColumn(child)
          }
        })
      }
    </AntdTable.ColumnGroup>
    )
  }, [p, renderColumn]);

  const renderChild = useCallback((node: any) => {
    const isGroup = node.props?.['x-component'] === "ProTable.ColumnGroup";
    if (isGroup) {
      return renderColumnGroup(node)
    } else {
      return renderColumn(node)
    }
  }, [renderColumn, renderColumnGroup])



  return (<AntdTable
    columns={columns}
    dataSource={data}
    rowSelection={selectable && {
      type: 'checkbox',
      ...rowSelection,
    }}
    onChange={onChange}>
    {/* {node.children?.map((node) => {
      return renderChild(node);
    })} */}
  </AntdTable>
  )

});
