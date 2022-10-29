import { memo } from "react"
import { Empty, List } from 'antd';
import React from "react";
import { RecursionField, useFieldSchema } from '@formily/react';
import { useParseLangMessage } from "~/plugin-sdk";
import { useArrayParams } from "~/plugin-sdk/contexts/array";
import { QueryType, useQueryParams } from "~/datasource/hooks/useQueryParams";
import { useDataQuery } from "~/datasource";
import { useShowError } from "~/AppDesigner/hooks/useShowError";

export interface IGrid {
  column?: number,
  xs?: number,
  sm?: number,
  md?: number,
  lg?: number,
  xl?: number,
  xxl?: number,
}

export const ListBody = memo((
  props: {
    gutter?: number,
    grid?: IGrid,
    childrenNodes?: any[]
  }
) => {
  const { gutter, grid, childrenNodes } = props;
  const p = useParseLangMessage();

  const {
    dataBind,
    queryForm,
    pageSize,
    current,
    orderBys,
    refreshFlag,
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

  return (
    <List
      grid={{ gutter, ...grid }}
      dataSource={data}
      loading={loading}
      renderItem={item => (
        <List.Item>
          {
            childrenNodes?.map((child, index) => {
              return (
                <div key={index}>
                  <RecursionField key={index} schema={child} name={child.name} />
                </div>
              )
            })
          }
          {
            !childrenNodes?.length &&
            <Empty />
          }
        </List.Item>
      )}
    />
  )
})