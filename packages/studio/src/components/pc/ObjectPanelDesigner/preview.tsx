import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { Container } from '@designable/formily-antd/lib/common/Container'
import { ObjectLocale } from './locales'
import { createFieldSchema } from "../../common/Field/shared"

export const ObjectPanelDesigner: DnFC<React.ComponentProps<typeof Container>> =
  Container
ObjectPanelDesigner.Behavior = createBehavior({
  name: 'ObjectPanel',
  extends: ['Field'],
  selector: (node) =>  node.props['x-component'] === 'ObjectPanel',
  designerProps: {
    droppable: true,
    propsSchema: createFieldSchema(
      undefined,
      {
        hasDataBindSource: true,
        noStyleTab: true,
        fieldSourceType: true,
      }
    ),
  },
  designerLocales: ObjectLocale,
})

ObjectPanelDesigner.Resource = createResource({
  icon: 'ObjectSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'object',
        'x-component': 'ObjectPanel',
      },
    },
  ],
})
