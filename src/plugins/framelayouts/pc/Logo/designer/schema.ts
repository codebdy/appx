import { IPropsSchema } from '@rxdrag/appx-plugin-sdk'

const schema: IPropsSchema = {
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
  },
}

export default schema