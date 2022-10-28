import { observer } from '@formily/reactive-react'
import { useParseLangMessage } from '@rxdrag/plugin-sdk/hooks/useParseLangMessage';
import React from 'react';
import { IDataSourceableProps } from '~/plugin-sdk';
import "./style.less"
import cls from "classnames";
import { ListHeader } from './ListHeader';

export interface IGridListProps extends IDataSourceableProps {
  className?: string,
  hasHeader?: boolean,
  pagination?: boolean,
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
  const { className, hasHeader, pagination, paginationPosition, pageSize, ...other } = props;
  const p = useParseLangMessage();

  return (
    <div className={cls("appx-grid-list", className)} {...other}>

    </div>
  )
})

GridList.Header = ListHeader

