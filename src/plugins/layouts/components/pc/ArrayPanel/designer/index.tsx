import {
  DnFC,
  DroppableWidget,
  useTreeNode,
  TreeNodeWidget
} from '@designable/react'
import { observer } from '@formily/reactive-react'
import React from 'react'
import { queryNodesByComponentPath } from '@rxdrag/plugin-sdk/funcs'
import { IArrayPanelProps } from '../view'


export const ArrayPanelDesigner: DnFC<IArrayPanelProps> = observer((props: IArrayPanelProps) => {
  const { value, onChange, ...other } = props;
  const node = useTreeNode()

  const children = queryNodesByComponentPath(node, [
    'ArrayPanel',
    '*'
  ])

  return (
    <div
      {...other}
    >
      {children.length ? (
        children.map((node) => (
          <TreeNodeWidget key={node.id} node={node} />
        ))
      ) : (
        <DroppableWidget hasChildren={false} style={{ whiteSpace: "nowrap" }}/>
      )}
    </div>
  )
})
