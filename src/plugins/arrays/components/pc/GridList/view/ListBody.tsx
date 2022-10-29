import { memo } from "react"
import { Empty, List } from 'antd';
import React from "react";
import { RecursionField } from '@formily/react';
import { useParseLangMessage } from "~/plugin-sdk";
const data = [{}];

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
  props:{
    gutter?: number,
    grid?: IGrid,
    childrenNodes?:any[]
  }
) => {
  const {gutter, grid, childrenNodes} = props;
  const p = useParseLangMessage();
  
  return (
    <List
      grid={{ gutter, ...grid }}
      dataSource={data}
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