import React from 'react'
import { Select as FormilySelect } from '@formily/antd'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { SelectSchema } from './schema'
import { createFieldSchema } from "../../common/Field/shared"
import { SelectLocales } from './locales'

export const SelectDesigner: DnFC<React.ComponentProps<typeof FormilySelect>> =
  FormilySelect

SelectDesigner.Behavior = createBehavior({
  name: 'Select',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Select',
  designerProps: {
    propsSchema: createFieldSchema(SelectSchema, { isDataField: true }),
  },
  designerLocales: SelectLocales,
})

SelectDesigner.Resource = createResource({
  icon: 'SelectSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        title: 'Select',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
      },
    },
  ],
})
