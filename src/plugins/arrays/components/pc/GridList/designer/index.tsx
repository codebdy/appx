import React from 'react'
import { FormGrid as FormilyGird } from '@formily/antd'
import {
  DnFC,
  useTreeNode,
  useNodeIdProps,
  DroppableWidget,
} from '@designable/react'
import { observer } from '@formily/reactive-react'
import './styles.less'

type formilyGrid = typeof FormilyGird

const GridListDesigner: DnFC<React.ComponentProps<formilyGrid>> & {
  GridColumn?: React.FC<React.ComponentProps<formilyGrid['GridColumn']>>
} = observer((props) => {
  const node = useTreeNode()
  const nodeId = useNodeIdProps()
  if (node.children.length === 0) return <DroppableWidget {...props} />

  const key = new Date().getTime()

  return (
    <div {...nodeId} className="dn-grid">

    </div>
  )
})

export default GridListDesigner;
