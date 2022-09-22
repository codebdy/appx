import { IPropsSchema } from '@rxdrag/appx-plugin-sdk'

export const schema: IPropsSchema = {
  props: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
    },
  },
  actions: ['onClick']
}

