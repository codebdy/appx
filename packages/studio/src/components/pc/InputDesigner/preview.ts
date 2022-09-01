import React from 'react'
import { Input } from '@formily/antd'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { InputSchema } from './schema'
import { InputLocales, TextAreaLocales } from './locales'
import { createFieldSchema } from "../../common/Field";

export const InputDesigner: DnFC<React.ComponentProps<typeof Input>> =
  Input

InputDesigner.Behavior = createBehavior(
  {
    name: 'Input',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Input',
    designerProps: {
      propsSchema: createFieldSchema(InputSchema, { fieldSourceType: true }),
    },
    designerLocales: InputLocales,
  },
  {
    name: 'Input.TextArea',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Input.TextArea',
    designerProps: {
      propsSchema: createFieldSchema(InputSchema.TextArea, { fieldSourceType: true }),
    },
    designerLocales: TextAreaLocales,
  }
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
          'x-component': 'Input',
        },
      },
    ],
  },
  {
    icon: 'TextAreaSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: 'TextArea',
          'x-decorator': 'FormItem',
          'x-component': 'Input.TextArea',
        },
      },
    ],
  }
)
