import { ISchema } from '@formily/react'

export const AvatarSchema: ISchema = {
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
