import { createBehavior, createResource } from '@designable/core'
import {
  DnFC,
  useTreeNode,
  TreeNodeWidget,
  DroppableWidget,
  useDesigner,
} from '@designable/react'
import { ArrayPanelSchema } from './schema'
import { ArrayPanelLocales } from './locales'
import { createFieldSchema, FieldsType } from "../../common/Field/shared"
import { IArrayPanelProps } from '../preview/pc'
import { observer } from '@formily/reactive-react'
import React from 'react'
import { ArrayBase } from '@formily/antd'
import { createEnsureTypeItemsNode, createNodeId, queryNodesByComponentPath } from '../../common/shared'

const ensureObjectItemsNode = createEnsureTypeItemsNode('object')

export const ArrayPanelDesigner: DnFC<IArrayPanelProps> = observer((props: IArrayPanelProps) => {
  const { value, children, ...other } = props;
  const node = useTreeNode();
  const designer = useDesigner();
  const childNodes = queryNodesByComponentPath(node, [
    'ArrayPanel',
    '*'
  ])
  return (
    <ArrayBase disabled>
      <ArrayBase.Item index={0} record={null}>
        <div
          {...other}
        >
          <div {...createNodeId(designer, ensureObjectItemsNode(node).id)}>
            {childNodes?.length ? (
              childNodes.map((node) => (
                <TreeNodeWidget key={node.id} node={node} />
              ))
            ) : (
              <DroppableWidget hasChildren={false} />
            )}
          </div>
        </div>
      </ArrayBase.Item>
    </ArrayBase>
  )
})

ArrayPanelDesigner.Behavior = createBehavior({
  name: 'ArrayPanel',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'ArrayPanel',
  designerProps: {
    droppable: false,
    propsSchema: createFieldSchema(ArrayPanelSchema, { fieldSourceType: FieldsType.Single }),
  },
  designerLocales: ArrayPanelLocales,
})

ArrayPanelDesigner.Resource = createResource({
  icon: 'ObjectSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'array',
        'x-component': 'ArrayPanel',
        'x-component-props': {
          title: `Title`,
        },
      },
    },
  ],
})
