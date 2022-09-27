import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { TagSchema } from './schema'
import { TagLocales } from './locales'
import { createFieldSchema, FieldsType } from "../../common/Field/shared"
import { Tag, ITagProps } from '../view'
import { observer } from '@formily/reactive-react'
import React from 'react'

export const TagDesigner: DnFC<ITagProps> = observer((props: ITagProps) => {
  const { value, ...other } = props;
  return (
    <Tag {...other} value="Tag" />
  )
})

TagDesigner.Behavior = createBehavior({
  name: 'Tag',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Tag',
  designerProps: {
    droppable: false,
    propsSchema: createFieldSchema(TagSchema, { fieldSourceType: FieldsType.Single }),
  },
  designerLocales: TagLocales,
})

TagDesigner.Resource = createResource({
  icon: 'SpaceSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string',
        'x-component': 'Tag',
      },
    },
  ],
})
