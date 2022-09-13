import { ISchema } from '@formily/react'

export const TextSchema: ISchema = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'MultiLangInput',
      'x-component-props':{
        multiline: true
      }
    },
    mode: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'normal',
      },
      enum: ['h1', 'h2', 'h3', 'p', 'normal'],
    },
  },
}
