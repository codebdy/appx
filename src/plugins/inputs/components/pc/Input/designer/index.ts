import React from 'react'
import { Input } from '@formily/antd'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { InputSchema } from './schema'
import { InputLocales, TextAreaLocales } from './locales'
import { createFieldSchema, FieldsType } from "../../../../../../components/common/Field";

export const InputDesigner: DnFC<React.ComponentProps<typeof Input>> =
  Input


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
