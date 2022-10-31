import { List } from 'antd';
import React, { useEffect, useMemo } from "react";
import { observer, RecursionField, ObjectField, Schema, useFieldSchema, useField } from '@formily/react';
import { useArrayParams } from "~/plugin-sdk/contexts/array";
import { QueryType, useQueryParams } from "~/datasource/hooks/useQueryParams";
import { useDataQuery } from "~/datasource";
import { useShowError } from "~/AppDesigner/hooks/useShowError";
import { ListPagination } from "./ListPagination";
import { ArrayBase } from '@formily/antd';
import { ItemRoot } from './ItemRoot';
import { Field } from '@formily/core';

export interface IGrid {
  column?: number,
  xs?: number,
  sm?: number,
  md?: number,
  lg?: number,
  xl?: number,
  xxl?: number,
}

export interface IListBodyProps {
  gutter?: number,
  grid?: IGrid,
  children?: React.ReactNode,
  className?: string,
}
export const ListBody = observer((
  props: IListBodyProps,
) => {
  const {
    gutter = 16,
    grid,
    children,
    ...other } = props;

  const {
    dataBind,
    queryForm,
    current,
    orderBys,
    refreshFlag,
    paginationPosition,
    hasPagination,
    pageSize,
  } = useArrayParams();

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

  const field = useField();

  useEffect(() => {
    (field as Field).setInitialValue(data?.nodes);
  }, [data?.nodes, field])

  const items = useMemo(() => Array.isArray(schema.items)
    ? schema.items[0]
    : schema.items, [schema.items]);

  return (
    <>
      <ArrayBase>
        <List
          {...other}
          grid={{ gutter, ...grid }}
          dataSource={data?.nodes}
          loading={loading}
          renderItem={(item, index) => {
            return (
              <List.Item>
                <ArrayBase.Item index={index} record={item}>
                  <ObjectField name={index}>
                    <ItemRoot instance={item}>
                      <RecursionField schema={items} name={items?.["x-designable-id"]} />
                    </ItemRoot>
                  </ObjectField>
                </ArrayBase.Item>
              </List.Item>
            )
          }
          }
        />
      </ArrayBase>
      {
        hasPagination && data && data.total > data.nodes?.length &&
        <ListPagination total={data.total} paginationPosition={paginationPosition} />
      }
    </>
  )
})