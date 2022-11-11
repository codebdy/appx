import { IPropsSchema } from '@rxdrag/appx-plugin-sdk'
import { Events } from '~/plugin-sdk'

export const DropdownMenuItemSchema: IPropsSchema = {
  actions: [Events.onClick],
  props: {
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
}