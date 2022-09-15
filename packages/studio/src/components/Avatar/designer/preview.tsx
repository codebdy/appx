import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { TextSchema } from './schema'
import { TextLocales } from './locales'
import { createFieldSchema } from "../../common/Field/shared"
import { Avatar, IAvatarProps } from '../preview/pc'

export const AvatarDesigner: DnFC<IAvatarProps> = Avatar

AvatarDesigner.Behavior = createBehavior({
  name: 'Avatar',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Avatar',
  designerProps: {
    droppable: false,
    propsSchema: createFieldSchema(TextSchema),
  },
  designerLocales: TextLocales,
})

AvatarDesigner.Resource = createResource({
  icon: 'ImageSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string',
        'x-component': 'Avatar',
      },
    },
  ],
})
