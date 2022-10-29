import { List } from 'antd';
import React from "react";
import { observer, RecursionField, ObjectField, Schema, useFieldSchema } from '@formily/react';
import { InstanceContext, useParseLangMessage } from "~/plugin-sdk";
import { useArrayParams } from "~/plugin-sdk/contexts/array";
import { QueryType, useQueryParams } from "~/datasource/hooks/useQueryParams";
import { useDataQuery } from "~/datasource";
import { useShowError } from "~/AppDesigner/hooks/useShowError";
import { ListPagination } from "./ListPagination";
import { ArrayBase } from '@formily/antd';
import { ItemRoot } from './ItemRoot';

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
    gutter,
    grid,
    children,
    ...other } = props;
  const p = useParseLangMessage();

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

  console.log("xxx", schema.items)
  return (
    <>
      <ArrayBase>
        <List
          {...other}
          grid={{ gutter, ...grid }}
          dataSource={data?.nodes}
          loading={loading}
          renderItem={(item, index) => {
            console.log("日内", item)
            return (
              <List.Item>
                <ArrayBase.Item index={index} record={item}>
                  <ItemRoot>
                    {
                      Schema.getOrderProperties(schema).map(child => {
                        return (
                          <RecursionField key={child.key} schema={child.schema} name={child.schema.name} />
                        )
                      })
                    }
                  </ItemRoot>
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