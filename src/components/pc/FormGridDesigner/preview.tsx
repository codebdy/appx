import React from 'react'
import { FormGrid as FormilyGird } from '@formily/antd'
import { TreeNode, createBehavior, createResource } from '@designable/core'
import {
  DnFC,
  useTreeNode,
  useNodeIdProps,
  DroppableWidget,
} from '@designable/react'
import { observer } from '@formily/reactive-react'
import './styles.less'
import { LoadTemplate } from '@designable/formily-antd/lib/common/LoadTemplate'
import { FormGridColumnSchema, FormGridLocales } from '../../../plugin-sdk/locales/FormGridLocales'
import { FormGridSchema } from '../../../plugin-sdk/schemas/FormGridSchema'
import { createFieldSchema } from "../../common/Field";

type formilyGrid = typeof FormilyGird

export const FormGridDesigner: DnFC<React.ComponentProps<formilyGrid>> & {
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

FormGridDesigner.Behavior = createBehavior(
  {
    name: 'FormGrid',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'FormGrid',
    designerProps: {
      droppable: true,
      allowDrop: (node) => node.props['x-component'] !== 'FormGrid',
      propsSchema: createFieldSchema(FormGridSchema),
    },
    designerLocales: FormGridLocales,
  },
  {
    name: 'FormGrid.GridColumn',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'FormGrid.GridColumn',
    designerProps: {
      droppable: true,
      resizable: {
        width(node) {
          const span = Number(node.props['x-component-props']?.gridSpan ?? 1)
          return {
            plus: () => {
              if (span + 1 > 12) return
              node.props['x-component-props'] =
                node.props['x-component-props'] || {}
              node.props['x-component-props'].gridSpan = span + 1
            },
            minus: () => {
              if (span - 1 < 1) return
              node.props['x-component-props'] =
                node.props['x-component-props'] || {}
              node.props['x-component-props'].gridSpan = span - 1
            },
          }
        },
      },
      resizeXPath: 'x-component-props.gridSpan',
      resizeStep: 1,
      resizeMin: 1,
      resizeMax: 12,
      allowDrop: (node) => node.props['x-component'] === 'FormGrid',
      propsSchema: createFieldSchema(FormGridSchema.GridColumn),
    },
    designerLocales: FormGridColumnSchema,
  }
)

FormGridDesigner.Resource = createResource({
  icon: 'GridSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'FormGrid',
      },
      children: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
          },
        },
      ],
    },
  ],
})
