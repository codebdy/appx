import { Table as AntdTable, TableProps } from 'antd';
import React, { useCallback, useEffect, useMemo } from 'react';
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
import { isArr, isObj } from '@formily/shared'
import { useParseLangMessage } from '../../../../hooks/useParseLangMessage';
import { observer } from '@formily/reactive-react';
import { useQueryParams } from '../../../../datasource/hooks/useQueryParams';
import { useDataQuery } from '../../../../datasource/hooks/useDataQuery';
import { useShowError } from '../../../../hooks/useShowError';
import { TextView } from '../../';
import {
  useField
} from '@formily/react'
import { InstanceContext } from '../../../../shared/contexts/instance';

interface ObservableColumnSource {
  columnProps: ColumnProps<any> & { sortable?: boolean }
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
  const { dataBind } = useProTableParams();
  const field = useField();
  const getTableColumns = (sources: ObservableColumnSource[], parentGroupNames: string[] = []): TableProps<any>['columns'] => {
    return sources?.reduce((buf, source, key, index) => {
      const { name, columnProps, schema, children/*, display*/ } = source || {}
      //if (display !== 'visible') return buf
      if (!isColumnComponent(schema) && !isColumnGroupComponent(schema)) return buf
      let rootName = parentGroupNames.length ? parentGroupNames[0] : name;//组根名字
      const groups = [...parentGroupNames, name];
      const { sortable, ...otherCoumnProps } = columnProps;
      return buf.concat({
        ...otherCoumnProps,
        children: getTableColumns(children, groups) || [],
        key,
        dataIndex: name,
        sorter: sortable ? { multiple: (key + 1) } : undefined,
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

            return (
              <InstanceContext.Provider
                value={{
                  field: field as Field,
                  instance: record,
                  entityName: dataBind.entityName,
                }}
              >
                <ArrayBase.Item index={index} record={record}>
                  <ReactField name={index}>
                    <ReactField name={rootName} value={record?.[rootName]} >
                      {children}
                    </ReactField>
                  </ReactField>
                </ArrayBase.Item>
              </InstanceContext.Provider>
            )
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

const mapOrderBy = (orderBy?: "ascend" | "descend"): 'asc' | 'desc' | undefined => {
  if (orderBy === "ascend") {
    return "asc"
  } else if (orderBy === "descend") {
    return "desc"
  }
  return orderBy;
}

export const Table = observer((
  props: TableProps<any>
) => {
  const { onSelectedChange, dataBind, queryForm, selectedRowKeys, onTableChange, paginationPosition, pageSize } = useProTableParams();
  const selectable = useSelectable();
  const sources = useArrayTableSources()
  const getTableColumns = useGetTableColumns();
  const columns = useMemo(() => getTableColumns(sources), [getTableColumns, sources]);
  const rowSelection = useMemo(() => ({
    type: 'checkbox' as any,
    selectedRowKeys: selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      onSelectedChange(selectedRowKeys);
    },
  }), [onSelectedChange, selectedRowKeys]);

  const schema = useFieldSchema();
  const queryParams = useQueryParams(dataBind, schema, queryForm);

  const { data, loading, error } = useDataQuery(queryParams);
  useShowError(error);

  if (data?.nodes && !Array.isArray(data?.nodes)) {
    throw new Error("Data is not array, please check query expression")
  }

  const field = useField();

  useEffect(() => {
    (field as Field).setValue(data?.nodes);
  }, [data?.nodes, field])

  const onChange = useCallback((pagination, filters, sorter, extra) => {
    onTableChange({
      current: pagination?.current,
      pageSize: pagination?.pageSize,
      sorter:
        isArr(sorter)
          ?
          sorter.map(orderBy => ({ field: orderBy.field, order: mapOrderBy(orderBy.order) }))
          :
          isObj(sorter)
            ? [{
              field: (sorter as any)?.field,
              order: mapOrderBy((sorter as any)?.order)
            }]
            : []
    });
    console.log('params', pagination, sorter);
  }, [onTableChange]);

  return (
    <ArrayBase>
      <AntdTable
        columns={columns}
        dataSource={data?.nodes}
        rowKey="id"
        rowSelection={selectable && rowSelection}
        pagination={{ position: paginationPosition as any, pageSize }}
        loading={loading}
        onChange={onChange}>
      </AntdTable>
    </ArrayBase>
  )
});
