import { Table as AntdTable, TableProps } from 'antd';
import React, { useMemo } from 'react';
import { useProTableParams, useSelectable } from '../context';
import { ArrayBase } from "@formily/antd"
import {
  useFieldSchema,
  RecursionField,
  Field
} from '@formily/react'
import { FieldDisplayTypes } from '@formily/core'
import { ColumnProps } from "antd/lib/table"
import { Schema } from '@formily/json-schema'
import { isArr, isStr } from '@formily/shared'
import { useParseLangMessage } from '../../../../../hooks/useParseLangMessage';
import { observer } from '@formily/reactive-react';
import { useQueryParams } from '../../../../../datasource/hooks/useQueryParams';
import { useDataQuery } from '../../../../../datasource/hooks/useDataQuery';
import { useShowError } from '../../../../../hooks/useShowError';

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

interface ObservableColumnSource {
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
  const schema = useFieldSchema();
  const parseSources = (schema: Schema): ObservableColumnSource[] => {
    const isColumn = isColumnComponent(schema);
    const isColumnGroup = isColumnGroupComponent(schema);
    if (isColumn || isColumnGroup) {
      if (!schema['x-component-props']?.['dataIndex'] && !schema['name'])
        return []
      const name = schema['x-component-props']?.['dataIndex'] || schema['name']
      const columnProps = schema['x-component-props'] || {}
      const display = schema['x-display']
      columnProps.title = p(columnProps?.title);
      return [
        {
          name,
          display,
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


export const Table = observer((
  props: TableProps<any>
) => {
  const { onSelectedChange, selectedRowKeys } = useProTableParams();
  const selectable = useSelectable();
  const sources = useArrayTableSources()
  const getTableColumns = useGetTableColumns();
  const { dataBindSource } = useProTableParams();
  const columns = useMemo(() => getTableColumns(sources), [getTableColumns, sources]);
  const rowSelection = useMemo(() => ({
    selectedRowKeys: selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      onSelectedChange(selectedRowKeys);
    },
  }), [onSelectedChange, selectedRowKeys]);

  const schema = useFieldSchema();
  const queryParams = useQueryParams(dataBindSource, schema);

  const {data, loading, error} = useDataQuery(queryParams);

  if(data && !Array.isArray(data)){
    throw new Error("Data is not array, please check query expression")
  }

  useShowError(error);
  return (
    <ArrayBase>
      <AntdTable
        columns={columns}
        dataSource={data}
        rowSelection={selectable && {
          type: 'checkbox',
          ...rowSelection,
        }}
        loading={loading}
        onChange={onChange}>
      </AntdTable>
    </ArrayBase>
  )
});
