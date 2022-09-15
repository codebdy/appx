import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { ArrayPannelSchema } from './schema'
import { ArrayPannelLocales } from './locales'
import { createFieldSchema, FieldsType } from "../../common/Field/shared"
import { ArrayPannel, IArrayPannelProps } from '../preview/pc'
import { observer } from '@formily/reactive-react'
import React from 'react'

export const ArrayPannelDesigner: DnFC<IArrayPannelProps> = observer((props: IArrayPannelProps) => {
  const {value, ...other} = props;
  return (
    <ArrayPannel {...other} />
  )
})

ArrayPannelDesigner.Behavior = createBehavior({
  name: 'EnumTags',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'EnumTags',
  designerProps: {
    droppable: false,
    propsSchema: createFieldSchema(ArrayPannelSchema, { fieldSourceType: FieldsType.Single }),
  },
  designerLocales: ArrayPannelLocales,
})

ArrayPannelDesigner.Resource = createResource({
  icon: 'SelectSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'boolean',
        'x-component': 'EnumTags',
      },
    },
  ],
})
