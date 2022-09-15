import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { EnumSelectSchema } from './schema'
import { EnumSelectLocales } from './locales'
import { createFieldSchema, FieldsType } from "../../common/Field/shared"
import { EnumSelect, IEnumSelectProps } from '../preview/pc'
import { observer } from '@formily/reactive-react'
import React from 'react'

export const EnumSelectDesigner: DnFC<IEnumSelectProps> = observer((props: IEnumSelectProps) => {
  const {value, ...other} = props;
  return (
    <EnumSelect {...other} />
  )
})

EnumSelectDesigner.Behavior = createBehavior({
  name: 'EnumTags',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'EnumTags',
  designerProps: {
    droppable: false,
    propsSchema: createFieldSchema(EnumSelectSchema, { fieldSourceType: FieldsType.Single }),
  },
  designerLocales: EnumSelectLocales,
})

EnumSelectDesigner.Resource = createResource({
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
