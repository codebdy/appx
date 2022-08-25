import { Table as AntdTable, TableProps } from 'antd';
import React, { memo, useMemo } from 'react';
import { useProTableParams, useSelectable } from '../context';
import { ArrayBase } from "@formily/antd"
import {
  useField,
  useFieldSchema,
  RecursionField,
  Field
} from '@formily/react'
import { GeneralField, FieldDisplayTypes } from '@formily/core'
import { ColumnProps } from "antd/lib/table"
import { Schema } from '@formily/json-schema'
import { isArr, isStr } from '@formily/shared'
import { useParseLangMessage } from '../../../../../hooks/useParseLangMessage';

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

function useGetTableColumns() {
  const p = useParseLangMessage();
  const getTableColumns = (sources: ObservableColumnSource[]): TableProps<any>['columns'] => {
    return sources?.reduce((buf, source, key) => {
      const { name, columnProps, schema, children/*, display*/ } = source || {}
      //if (display !== 'visible') return buf
      if (!isColumnComponent(schema) && !isColumnGroupComponent(schema)) return buf
      return buf.concat({
        ...columnProps,
        children: getTableColumns(children) || [],
        key,
        dataIndex: name,
        render: !children.length
          ? (value: any, record: any, index: number) => {
            const children = (
              <ArrayBase.Item index={index} record={record}>
                <Field name={name} value={record?.[name]} >
                  {
                    schema.properties && Object.keys(schema.properties).length > 0
                      ? <RecursionField schema={schema} onlyRenderProperties />
                      : isStr(record?.[name]) ? p(record?.[name]) : record?.[name]
                  }
                </Field>
              </ArrayBase.Item>
            )
            return children
          }
          : undefined,
      })
    }, [])
  }

  return getTableColumns;
}

const useArrayTableSources = () => {
  const p = useParseLangMessage();
  const arrayField = useField()
  const schema = useFieldSchema();
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
      columnProps.title = p(columnProps?.title);
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
  const sources = useArrayTableSources()
  const getTableColumns = useGetTableColumns();
  const columns = useMemo(() => getTableColumns(sources), [getTableColumns, sources]);

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
        loading={false}
        onChange={onChange}>
      </AntdTable>
    </ArrayBase>
  )
});
