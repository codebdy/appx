import React from 'react'
import {
  DnFC,
  useTreeNode,
} from '@designable/react'
import { observer } from '@formily/reactive-react'
import './styles.less'
import { IGridListProps } from '../view'
import cls from "classnames";
import { IListHeaderProps } from '../view/ListHeader'
import { ListHeaderDesigner } from './ListHeaderDesigner'

export const GridListDesigner: DnFC<IGridListProps> & {
  ListHeader?: React.FC<IListHeaderProps>
}   = observer((props) => {
  const { className, hasHeader, pagination, paginationPosition, pageSize, ...other } = props;
  const node = useTreeNode()

  return (
    <div {...other} className={cls("appx-grid-list", className)}>

    </div>
  )
})

GridListDesigner.ListHeader = ListHeaderDesigner;
