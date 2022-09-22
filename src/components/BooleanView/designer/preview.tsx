import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { BooleanViewSchema } from './schema'
import { BooleanViewLocales } from './locales'
import { createFieldSchema, FieldsType } from "../../common/Field/shared"
import { BooleanView, IBooleanViewProps } from '../preview/pc'
import { observer } from '@formily/reactive-react'
import React from 'react'

export const BooleanViewDesigner: DnFC<IBooleanViewProps> = observer((props: IBooleanViewProps) => {
  const {value, ...other} = props;
  return (
    <BooleanView value={true} {...other} />
  )
})

BooleanViewDesigner.Behavior = createBehavior({
  name: 'BooleanView',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'BooleanView',
  designerProps: {
    droppable: false,
    propsSchema: createFieldSchema(BooleanViewSchema, { fieldSourceType: FieldsType.Single }),
  },
  designerLocales: BooleanViewLocales,
})

BooleanViewDesigner.Resource = createResource({
  icon: 'SwitchSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'boolean',
        'x-component': 'BooleanView',
      },
    },
  ],
})
