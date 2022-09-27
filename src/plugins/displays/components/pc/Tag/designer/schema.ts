import { ISchema } from '@formily/react'

export const TagSchema: ISchema = {
  type: 'object',
  properties: {
    icon: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'IconInput',
      'x-component-props': {
      }
    },
    color: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'ColorInput',
      'x-component-props': {
      }
    },
  },
}
