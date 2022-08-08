import { ISchema } from '@formily/react'

export const ButtonSchema: ISchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    'type': {
      type: 'string',
      enum: ['primary', 'ghost', 'dashed', 'link', "text", "default"],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'primary',
      },
    },
  },
}
