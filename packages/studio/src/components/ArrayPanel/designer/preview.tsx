import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { ArrayPanelSchema } from './schema'
import { ArrayPanelLocales } from './locales'
import { createFieldSchema, FieldsType } from "../../common/Field/shared"
import { ArrayPanel, IArrayPanelProps } from '../preview/pc'
import { observer } from '@formily/reactive-react'
import React from 'react'

export const ArrayPanelDesigner: DnFC<IArrayPanelProps> = observer((props: IArrayPanelProps) => {
  const {value, ...other} = props;
  return (
    <ArrayPanel {...other} />
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
  icon: 'ArrayCardsSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'boolean',
        'x-component': 'ArrayPanel',
      },
    },
  ],
})
