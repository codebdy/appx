import { observer } from '@formily/reactive-react'
import { useParseLangMessage } from '@rxdrag/plugin-sdk/hooks/useParseLangMessage';
import React, { useMemo } from 'react';
import { IDataSourceableProps } from '~/plugin-sdk';
import "./style.less"
import cls from "classnames";
import { ListHeader } from './ListHeader';
import { RecursionField, Schema, useFieldSchema } from '@formily/react';
import { Pagination } from 'antd';
import { ListPagination } from './ListPagination';

export interface IGridListProps extends IDataSourceableProps {
  className?: string,
  hasHeader?: boolean,
  hasPagination?: boolean,
  paginationPosition?: "bottomLeft" | "bottomCenter" | "bottomRight",
  pageSize?: number,
  column?: number,
  gutter?: number,
  xs?: number,
  sm?: number,
  md?: number,
  lg?: number,
  xl?: number,
  xxl?: number,
}

export const GridList: React.FC<IGridListProps> & {
  Header?: React.FC<IGridListProps>
} = observer((props: IGridListProps) => {
  const { className,
    hasHeader,
    hasPagination,
    paginationPosition,
    pageSize,
    ...other
  } = props;
  const fieldSchema = useFieldSchema()
  const p = useParseLangMessage();
  const slots = useMemo(() => {
    const slts = {
      header: null,
      otherChildren: []
    }

    for (const child of Schema.getOrderProperties(fieldSchema)) {
      const childSchema = child?.schema;
      if (childSchema["x-component"] === 'GridList.Header') {
        slts.header = childSchema
      } else {
        slts.otherChildren.push(childSchema)
      }
    }

    return slts;
  }, [fieldSchema])

  return (
    <div className={cls("appx-grid-list", className)} {...other}>
      {hasHeader && slots.header && <RecursionField schema={slots.header} name={slots.header.name} />}
      {
        slots.otherChildren?.map((child, index) => {
          return (
            <div key={index}>
              <RecursionField key={index} schema={child} name={child.name} />
            </div>
          )
        })
      }
      {
        hasPagination && 
        <ListPagination total={50} paginationPosition={paginationPosition} />
      }
    </div>
  )
})

GridList.Header = ListHeader

