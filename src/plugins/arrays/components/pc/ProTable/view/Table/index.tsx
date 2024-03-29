import { Table as AntdTable, TableProps } from 'antd';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTableParams } from '~/plugin-sdk/contexts/table';
import { ArrayBase } from "@formily/antd"
import {
  useFieldSchema
} from '@formily/react'
import { Field, FieldDisplayTypes } from '@formily/core'
import { ColumnProps } from "antd/lib/table"
import { Schema } from '@formily/json-schema'
import { isArr, isObj } from '@formily/shared'
import { observer } from '@formily/reactive-react';
import { QueryType, useQueryParams } from '~/datasource/hooks/useQueryParams';
import { useDataQuery } from '~/datasource/hooks/useDataQuery';
import { useShowError } from '~/AppDesigner/hooks/useShowError';
import {
  useField
} from '@formily/react'
import { useGetTableColumns } from './useGetTableColumns';
import { useArrayTableSources } from './useArrayTableSources';
import { mapOrderBy } from "~/datasource/hooks/mapOrderBy";
import { useArrayParams, useSelectable } from '~/plugin-sdk/contexts/array';

export interface ObservableColumnSource {
  columnProps: ColumnProps<any> & { sortable?: boolean }
  schema: Schema
  display: FieldDisplayTypes
  name: string,
  children?: ObservableColumnSource[],
}

export const Table = observer((
  props: TableProps<any>
) => {
  const {
    dataBind,
    queryForm,
    selectedRowKeys,
    paginationPosition,
    pageSize,
    current,
    orderBys,
    refreshFlag,
  } = useArrayParams();

  const tableParams = useTableParams();
  const arrayParams = useArrayParams();
  const selectable = useSelectable();
  const sources = useArrayTableSources()
  const getTableColumns = useGetTableColumns();
  const columns = useMemo(() => {
    const colSources = sources.filter(source => tableParams?.tableConfig?.columns?.find(col => col === source.name))
    return getTableColumns(tableParams?.tableConfig?.columns?.map(column => colSources.find(src => column === src.name)) || sources) || []
  }, [getTableColumns, tableParams?.tableConfig?.columns, sources]);

  useEffect(() => {
    tableParams.columns = sources.map(source => ({
      name: source.name,
      title: source.columnProps?.title as any,
    }))
  }, [tableParams, sources])

  const rowSelection = useMemo(() => ({
    type: 'checkbox' as any,
    selectedRowKeys: selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      arrayParams.selectedRowKeys = selectedRowKeys
    },
  }), [tableParams, selectedRowKeys]);

  const schema = useFieldSchema();
  const queryParams = useQueryParams(
    dataBind,
    schema,
    QueryType.Multiple,
    {
      queryForm,
      orderBys,
      current,
      pageSize,
      refreshFlag,
    },
  );

  const { data, loading, error } = useDataQuery(queryParams);
  useShowError(error);

  if (data?.nodes && !Array.isArray(data?.nodes)) {
    throw new Error("Data is not array, please check query expression")
  }

  const field = useField();

  useEffect(() => {
    (field as Field).setInitialValue(data?.nodes);
  }, [data?.nodes, field])

  const onChange = useCallback((pagination, filters, sorter, extra) => {
    const sortableColumns = sources?.filter(column => column.columnProps?.sortable);
    const orderBys = isArr(sorter)
      ?
      sorter.map(orderBy => ({ field: orderBy.field, order: mapOrderBy(orderBy.order) }))
      :
      isObj(sorter)
        ? [{
          field: (sorter as any)?.field,
          order: mapOrderBy((sorter as any)?.order)
        }]
        : []
    arrayParams.current = pagination?.current || 1;
    arrayParams.pageSize = pagination?.pageSize;
    arrayParams.orderBys = sortableColumns.map(col => ({
      field: col.name,
      order: undefined,
    })).map((orderBy) => {
      const newOrderBy = orderBys.find(od => od.field === orderBy.field)
      return newOrderBy ? newOrderBy : orderBy;
    });
    console.log('params', sorter);
  }, [arrayParams, sources]);

  return (
    <ArrayBase>
      <AntdTable
        columns={columns}
        dataSource={data?.nodes}
        rowKey="id"
        rowSelection={selectable && rowSelection}
        pagination={{
          position: paginationPosition as any,
          pageSize,
          total: data?.total,
          current: arrayParams.current,
        }}
        size={tableParams?.tableConfig?.size}
        loading={loading}
        onChange={onChange}>
      </AntdTable>
    </ArrayBase>
  )
});
