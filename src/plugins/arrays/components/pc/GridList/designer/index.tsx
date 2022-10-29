import React from 'react'
import {
  DnFC,
  TreeNodeWidget,
} from '@designable/react'
import { observer } from '@formily/reactive-react'
import './styles.less'
import { IGridListProps } from '../view'
import cls from "classnames";
import { IListHeaderProps } from '../view/ListHeader'
import { ListHeaderDesigner } from './ListHeaderDesigner'
import { useFindNode } from '~/plugin-sdk'
import { ListPagination } from '../view/ListPagination'
import { IListBodyProps } from '../view/ListBody'
import { ListBodyDesigner } from './ListBodyDesigner'

export const GridListDesigner: DnFC<IGridListProps> & {
  Header?: React.FC<IListHeaderProps>
  Body?: React.FC<IListBodyProps>
} = observer((props) => {
  const {
    className,
    hasHeader,
    hasPagination,
    paginationPosition,
    pageSize,
    ...other
  } = props;
  const header = useFindNode('Header');
  const body = useFindNode('Body');
  
  return (
    <div {...other} className={cls("appx-grid-list", className)}>
      {
        hasHeader && header && <TreeNodeWidget node={header} />
      }
      {
        body && <TreeNodeWidget node={body} />
      }
      {
        hasPagination && <ListPagination total={2} paginationPosition={paginationPosition} />
      }

    </div>
  )
})

GridListDesigner.Header = ListHeaderDesigner;
GridListDesigner.Body = ListBodyDesigner;
