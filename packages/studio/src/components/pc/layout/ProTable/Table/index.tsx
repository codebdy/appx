import { Button, Table as AntdTable, TableProps, Tag } from 'antd';
import React, { memo, useMemo } from 'react';
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
  name: string,
  children?: ObservableColumnSource[],
}

const isColumnComponent = (schema: Schema) => {
  return schema?.['x-component'] === 'ProTable.Column'
}
const isColumnGroupComponent = (schema: Schema) => {
  return schema?.['x-component'] === 'ProTable.ColumnGroup'
}

// const isOperationsComponent = (schema: Schema) => {
//   return schema['x-component']?.indexOf('Operations') > -1
// }


// rowSelection object indicates the need for row selection
const getTableColumns = (
  dataSource: any[],
  sources: ObservableColumnSource[]
): TableProps<any>['columns'] => {
  return sources?.reduce((buf, source, key) => {
    const { name, columnProps, schema, children, display } = source || {}
    //if (display !== 'visible') return buf
    if (!isColumnComponent(schema) && !isColumnGroupComponent(schema)) return buf
    return buf.concat({
      ...columnProps,
      children: getTableColumns(dataSource, children) || [],
      key,
      dataIndex: name,
      render: !children.length
        ? (value: any, record: any, index: number) => {
          //const index = dataSource.indexOf(record)
          const children = (
            <ArrayBase.Item index={index} record={() => dataSource[index]}>
              <RecursionField schema={schema} name={index} onlyRenderProperties />
            </ArrayBase.Item>
          )
          return children
        }
        : undefined,
    })
  }, [])
}

const useArrayTableSources = () => {
  const arrayField = useField()
  const schema = useFieldSchema()
  const parseSources = (schema: Schema): ObservableColumnSource[] => {
    const isColumn = isColumnComponent(schema);
    const isColumnGroup = isColumnGroupComponent(schema);
    if (isColumn || isColumnGroup) {
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
          children: schema.reduceProperties((buf, schema) => {
            return buf.concat(parseSources(schema))
          }, []).filter(child => child),
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
  const field = useField<ArrayField>()
  const dataSource = Array.isArray(field.value) ? field.value.slice() : []
  const sources = useArrayTableSources()
  const columns = getTableColumns(dataSource, sources)

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

  return (
    <ArrayBase>
      <AntdTable
        columns={columns}
        dataSource={data}
        rowSelection={selectable && {
          type: 'checkbox',
          ...rowSelection,
        }}
        onChange={onChange}>
      </AntdTable>
    </ArrayBase>
  )

});
