import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { SelectSchema } from './schema'
import { createFieldSchema } from "../../common/Field/shared"
import { SelectLocales } from './locales'
import { Select } from '../Select'

export const SelectDesigner: DnFC<React.ComponentProps<typeof Select>> = Select

SelectDesigner.Behavior = createBehavior({
  name: 'Select',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Select',
  designerProps: {
    propsSchema: createFieldSchema(SelectSchema, { isDataField: true, hasDataBindSource: true }),
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
