import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { EnumSelectSchema } from './schema'
import { EnumSelectLocales } from './locales'
import { EnumSelect, IEnumSelectProps } from '../view'
import { observer } from '@formily/reactive-react'
import React from 'react'
import { FieldsType } from '@rxdrag/appx-plugin-sdk'

export const EnumSelectDesigner: DnFC<IEnumSelectProps> = observer((props: IEnumSelectProps) => {
  const {value, ...other} = props;
  return (
    <EnumSelect {...other} />
  )
})

EnumSelectDesigner.Behavior = createBehavior({
  name: 'EnumSelect',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'EnumSelect',
  designerProps: {
    droppable: false,
    //propsSchema: createFieldSchema(EnumSelectSchema, { fieldSourceType: FieldsType.Single }),
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
        'x-component': 'EnumSelect',
      },
    },
  ],
})
