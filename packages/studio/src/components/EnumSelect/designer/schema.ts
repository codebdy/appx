import { ISchema } from '@formily/react'

export const EnumSelectSchema: ISchema = {
  type: 'object',
  properties: {
    trueIcon: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'IconInput',
      'x-component-props': {
      }
    },
    falseIcon: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'IconInput',
      'x-component-props': {
      }
    },
  },
}
