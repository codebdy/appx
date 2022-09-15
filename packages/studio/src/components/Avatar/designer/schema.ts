import { ISchema } from '@formily/react'

export const TextSchema: ISchema = {
  type: 'object',
  properties: {
    icon: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'IconInput',
      'x-component-props':{
      }
    },
  },
}
