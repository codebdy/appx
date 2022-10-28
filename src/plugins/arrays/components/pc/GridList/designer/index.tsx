import React, { useMemo } from 'react'
import {
  DnFC,
  useTreeNode,
  TreeNodeWidget,
} from '@designable/react'
import { observer } from '@formily/reactive-react'
import './styles.less'
import { IGridListProps } from '../view'
import cls from "classnames";
import { IListHeaderProps } from '../view/ListHeader'
import { ListHeaderDesigner } from './ListHeaderDesigner'
import { useFindNode } from '~/plugin-sdk'

export const GridListDesigner: DnFC<IGridListProps> & {
  Header?: React.FC<IListHeaderProps>
} = observer((props) => {
  const { className, hasHeader, pagination, paginationPosition, pageSize, ...other } = props;
  const node = useTreeNode()
  const header = useFindNode('Header');
  const otherChildrenNodes = useMemo(() => node.children?.filter(child =>
    child.id !== header?.id
  ), [header?.id, node.children])


  return (
    <div {...other} className={cls("appx-grid-list", className)}>
      {
        hasHeader && header && <TreeNodeWidget node={header} />
      }
      {
        otherChildrenNodes?.map((child) => {
          return (
            child && <TreeNodeWidget node={child} />
          )
        })
      }
    </div>
  )
})

GridListDesigner.Header = ListHeaderDesigner;
