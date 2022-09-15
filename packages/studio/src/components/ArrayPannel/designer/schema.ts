import { ISchema } from '@formily/react'

export const ArrayPannelSchema: ISchema = {
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
