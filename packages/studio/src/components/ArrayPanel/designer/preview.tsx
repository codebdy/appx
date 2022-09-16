import { createBehavior, createResource } from '@designable/core'
import {
  DnFC,
  DroppableWidget,
} from '@designable/react'
import { ArrayPanelSchema } from './schema'
import { ArrayPanelLocales } from './locales'
import { createFieldSchema, FieldsType } from "../../common/Field/shared"
import { IArrayPanelProps } from '../preview/pc'
import { observer } from '@formily/reactive-react'
import React from 'react'


export const ArrayPanelDesigner: DnFC<IArrayPanelProps> = observer((props: IArrayPanelProps) => {
  const { value, onChange, children, ...other } = props;

  return (
    <div
      {...other}
    >
      {
        children
          ?
          children
          :
          <DroppableWidget hasChildren={false} style={{ whiteSpace: "nowrap" }} />
      }
    </div>
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
