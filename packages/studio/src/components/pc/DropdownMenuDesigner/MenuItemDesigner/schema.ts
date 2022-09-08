import { ISchema } from '@formily/react'

export const DropdownMenuItemSchema: ISchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'MultiLangInput',
    },
    icon: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'IconInput',
    },
  },
}
