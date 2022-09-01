import React from 'react'
import { Input } from '@formily/antd'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { InputSchema } from '../InputDesigner/schema'
import { InputLocales } from '../InputDesigner/locales'
import { createFieldSchema, FieldSoureType } from "../../common/Field";

export const InputDesigner: DnFC<React.ComponentProps<typeof Input>> =
  Input

InputDesigner.Behavior = createBehavior(
  {
    name: 'Input',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Input',
    designerProps: {
      propsSchema: createFieldSchema(InputSchema, { fieldSourceType: FieldSoureType.Multiple }),
    },
    designerLocales: InputLocales,
  },
)

InputDesigner.Resource = createResource(
  {
    icon: 'InputSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: 'Input',
          'x-decorator': 'FormItem',
          'x-component': 'SearchInput',
        },
      },
    ],
  },
)
