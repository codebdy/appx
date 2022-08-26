import { Table as AntdTable, TableProps } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { useProTableParams, useSelectable } from '../context';
import { ArrayBase } from "@formily/antd"
import {
  useFieldSchema,
  RecursionField,
  Field as ReactField
} from '@formily/react'
import { Field, FieldDisplayTypes } from '@formily/core'
import { ColumnProps } from "antd/lib/table"
import { Schema } from '@formily/json-schema'
import { isArr } from '@formily/shared'
import { useParseLangMessage } from '../../../../../hooks/useParseLangMessage';
import { observer } from '@formily/reactive-react';
import { useQueryParams } from '../../../../../datasource/hooks/useQueryParams';
import { useDataQuery } from '../../../../../datasource/hooks/useDataQuery';
import { useShowError } from '../../../../../hooks/useShowError';
import { TextView } from '../../../dispaly';
import {
  useField
} from '@formily/react'

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
  const getTableColumns = (sources: ObservableColumnSource[], parentGroupNames: string[] = []): TableProps<any>['columns'] => {
    return sources?.reduce((buf, source, key) => {
      const { name, columnProps, schema, children/*, display*/ } = source || {}
      //if (display !== 'visible') return buf
      if (!isColumnComponent(schema) && !isColumnGroupComponent(schema)) return buf
      let rootName = parentGroupNames.length ? parentGroupNames[0] : name;//组根名字
      const groups = [...parentGroupNames, name];
      return buf.concat({
        ...columnProps,
        children: getTableColumns(children, groups) || [],
        key,
        dataIndex: name,
        render: !children.length
          ? (value: any, record: any, index: number) => {
            let children = (
              schema.properties && Object.keys(schema.properties).length > 0
                ? <RecursionField schema={schema} onlyRenderProperties />
                : <TextView inherited={false}></TextView>
            )
            for (let i = groups.length - 1; i > 0; i--) {
              const groupName = groups[i];
              children = <ReactField name={groupName} >
                {children}
              </ReactField>
            }

            return <ArrayBase.Item index={index} record={record}>
              <ReactField name={index}>
                <ReactField name={rootName} value={record?.[rootName]} >
                  {children}
                </ReactField>
              </ReactField>
            </ArrayBase.Item>
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

  const { data, loading, error } = useDataQuery(queryParams);
  useShowError(error);

  if (data && !Array.isArray(data)) {
    throw new Error("Data is not array, please check query expression")
  }

  const field = useField();

  useEffect(() => {
    (field as Field).setInitialValue(data);
  }, [data, field])

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
