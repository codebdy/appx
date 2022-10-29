import { observer } from '@formily/reactive-react'
import React, { useMemo } from 'react';
import { IDataSourceableProps } from '~/plugin-sdk';
import "./style.less"
import cls from "classnames";
import { ListHeader } from './ListHeader';
import { RecursionField, Schema, useField, useFieldSchema } from '@formily/react';
import { ListPagination } from './ListPagination';
import { observable } from "@formily/reactive"
import { ArrayContext } from '~/plugin-sdk/contexts/array';
import { IGrid, ListBody } from './ListBody';

export interface IGridListProps extends IDataSourceableProps {
  className?: string,
  hasHeader?: boolean,
  hasPagination?: boolean,
  paginationPosition?: "bottomLeft" | "bottomCenter" | "bottomRight",
  pageSize?: number,
}

export const GridList: React.FC<IGridListProps> & {
  Header?: React.FC<IGridListProps>,
  Body?: React.FC<IGridListProps>,
} = observer((props: IGridListProps) => {
  const {
    dataBind,
    className,
    hasHeader,
    hasPagination,
    paginationPosition,
    pageSize,
    ...other
  } = props;
  const fieldSchema = useFieldSchema()
  const field = useField();

  const arrayParams = useMemo(() => {
    return observable({
      dataBind,
      current: 1,
      pageSize: pageSize || 10,
      path: field.path.toString()
    });
  }, [dataBind, field.path, pageSize]);


  const slots = useMemo(() => {
    const slts = {
      header: null,
      body: null
    }

    for (const child of Schema.getOrderProperties(fieldSchema)) {
      const childSchema = child?.schema;
      if (childSchema["x-component"] === 'GridList.Header') {
        slts.header = childSchema
      } else if (childSchema["x-component"] === 'GridList.Body') {
        slts.body = childSchema
      }
    }

    return slts;
  }, [fieldSchema])

  return (
    <ArrayContext.Provider value={arrayParams}>
      <div className={cls("appx-grid-list", className)} {...other}>
        {hasHeader && slots.header && <RecursionField schema={slots.header} name={slots.header.name} />}

        {slots.body && <RecursionField schema={slots.body} name={slots.body.name} />}

        {
          hasPagination &&
          <ListPagination total={50} paginationPosition={paginationPosition} />
        }
      </div>
    </ArrayContext.Provider>
  )
})

GridList.Header = ListHeader
GridList.Body = ListBody

