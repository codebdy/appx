import React from 'react'
import { FormGrid as FormilyGird } from '@formily/antd'
import { TreeNode } from '@designable/core'
import {
  DnFC,
  useTreeNode,
  useNodeIdProps,
  DroppableWidget,
} from '@designable/react'
import { observer } from '@formily/reactive-react'
import './styles.less'
import { LoadTemplate } from '@designable/formily-antd/lib/common/LoadTemplate'

type formilyGrid = typeof FormilyGird

const FormGridDesigner: DnFC<React.ComponentProps<formilyGrid>> & {
  GridColumn?: React.FC<React.ComponentProps<formilyGrid['GridColumn']>>
} = observer((props) => {
  const node = useTreeNode()
  const nodeId = useNodeIdProps()
  if (node.children.length === 0) return <DroppableWidget {...props} />

  const key = new Date().getTime()

  return (
    <div {...nodeId} className="dn-grid">
      <FormilyGird {...props} key={key}>
        {props.children}
      </FormilyGird>
      <LoadTemplate
        actions={[
          {
            title: node.getMessage('addGridColumn'),
            icon: 'AddColumn',
            onClick: () => {
              const column = new TreeNode({
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'FormGrid.GridColumn',
                },
              })
              node.append(column)
            },
          },
        ]}
      />
    </div>
  )
})

FormGridDesigner.GridColumn = observer((props) => {
  return (
    <DroppableWidget
      {...props}
      data-span={props.gridSpan}
      style={{
        ...props['style'],
        gridColumnStart: `span ${props.gridSpan || 1}`,
      }}
    >
      {props.children}
    </DroppableWidget>
  )
})

export default FormGridDesigner;
