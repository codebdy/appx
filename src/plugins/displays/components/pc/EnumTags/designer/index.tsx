import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { EnumTagsSchema } from './schema'
import { EnumTagsLocales } from './locales'
// import { createFieldSchema, FieldsType } from "../../../../common/Field/shared"
// import { EnumTags, IEnumTagsProps } from '../view'
import { observer } from '@formily/reactive-react'
import React from 'react'

export const EnumTagsDesigner: DnFC<IEnumTagsProps> = observer((props: IEnumTagsProps) => {
  const {value, ...other} = props;
  return (
    <EnumTags {...other} />
  )
})

EnumTagsDesigner.Behavior = createBehavior({
  name: 'EnumTags',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'EnumTags',
  designerProps: {
    droppable: false,
    //propsSchema: createFieldSchema(EnumTagsSchema, { fieldSourceType: FieldsType.Single }),
  },
  designerLocales: EnumTagsLocales,
})

EnumTagsDesigner.Resource = createResource({
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
