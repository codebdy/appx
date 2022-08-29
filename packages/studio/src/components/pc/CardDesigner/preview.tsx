import React from 'react'
import { Card as AntdCard } from 'antd'
import { createFieldSchema } from "../../common/Field/shared"
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { CardLocales } from './locales'
import { CardSchema } from './schema'
import { Card } from '../Card'

export const CardDesigner: DnFC<React.ComponentProps<typeof AntdCard>> = Card

CardDesigner.Behavior = createBehavior({
  name: 'Card',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Card',
  designerProps: {
    droppable: true,
    propsSchema: createFieldSchema(CardSchema),
  },
  designerLocales: CardLocales,
})

CardDesigner.Resource = createResource({
  icon: 'CardSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'Card',
        'x-component-props': {
          title: 'Title',
        },
      },
    },
  ],
})
