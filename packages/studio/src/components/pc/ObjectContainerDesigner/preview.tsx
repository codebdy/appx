import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { Container } from '@designable/formily-antd/lib/common/Container'
import { ObjectLocale } from './locales'
import { createFieldSchema } from "../../common/Field/shared"

export const ObjectContainerDesigner: DnFC<React.ComponentProps<typeof Container>> =
  Container
ObjectContainerDesigner.Behavior = createBehavior({
  name: 'Object',
  extends: ['Field'],
  selector: (node) => node.props.type === 'object',
  designerProps: {
    droppable: true,
    propsSchema: createFieldSchema(undefined, { hasDataBindSource: true, noStyleTab: true }),
  },
  designerLocales: ObjectLocale,
})

ObjectContainerDesigner.Resource = createResource({
  icon: 'ObjectSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'object',
      },
    },
  ],
})
