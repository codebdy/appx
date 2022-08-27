import React from 'react'
import { FormLayout as FormilyFormLayout } from '@formily/antd'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { withContainer } from '@designable/formily-antd/lib/common/Container'
import { createFieldSchema } from '../../common/Field'
import { FormLayoutLocales } from './locales'
import { FormLayoutSchema } from './schema'

export const FormLayout: DnFC<React.ComponentProps<typeof FormilyFormLayout>> =
  withContainer(FormilyFormLayout)

FormLayout.Behavior = createBehavior({
  name: 'FormLayout',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'FormLayout',
  designerProps: {
    droppable: true,
    propsSchema: createFieldSchema(FormLayoutSchema),
  },
  designerLocales: FormLayoutLocales,
})

FormLayout.Resource = createResource({
  icon: 'FormLayoutSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'FormLayout',
      },
    },
  ],
})
