import { Table as AntdTable, TableProps } from 'antd';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useProTableParams, useSelectable } from '../context';
import { ArrayBase } from "@formily/antd"
import {
  useFieldSchema
} from '@formily/react'
import { Field, FieldDisplayTypes } from '@formily/core'
import { ColumnProps } from "antd/lib/table"
import { Schema } from '@formily/json-schema'
import { isArr, isObj } from '@formily/shared'
import { observer } from '@formily/reactive-react';
import { QueryType, useQueryParams } from '../../../../datasource/hooks/useQueryParams';
import { useDataQuery } from '../../../../datasource/hooks/useDataQuery';
import { useShowError } from '../../../../hooks/useShowError';
import {
  useField
} from '@formily/react'
import { useGetTableColumns } from './useGetTableColumns';
import { useArrayTableSources } from './useArrayTableSources';
import { mapOrderBy } from "../../../../datasource/hooks/mapOrderBy";

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
  } = useProTableParams();
  const protableParams = useProTableParams();
  const selectable = useSelectable();
  const sources = useArrayTableSources()
  const getTableColumns = useGetTableColumns();
  const columns = useMemo(() => getTableColumns(sources), [getTableColumns, sources]);

  useEffect(() => {
    console.log("sources 变化")
  }, [sources])

  useEffect(() => {
    console.log("Coumns 变化")
  }, [columns])

  const rowSelection = useMemo(() => ({
    type: 'checkbox' as any,
    selectedRowKeys: selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      protableParams.selectedRowKeys = selectedRowKeys
    },
  }), [protableParams, selectedRowKeys]);

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
    (field as Field).setValue(data?.nodes);
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
    protableParams.current = pagination?.current || 1;
    protableParams.pageSize = pagination?.pageSize;
    protableParams.orderBys = sortableColumns.map(col => ({
      field: col.name,
      order: undefined,
    })).map((orderBy) => {
      const newOrderBy = orderBys.find(od => od.field === orderBy.field)
      return newOrderBy ? newOrderBy : orderBy;
    });
    console.log('params', sorter);
  }, [protableParams, sources]);

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
          current: protableParams.current,
        }}
        size={protableParams.size}
        loading={loading}
        onChange={onChange}>
      </AntdTable>
    </ArrayBase>
  )
});
