import { IPropsSchema } from '@rxdrag/appx-plugin-sdk'
import { Events } from '~/plugin-sdk'

const schema: IPropsSchema = {
  actions: [Events.onClick],
  props: {
    type: 'object',
    properties: {
      cursor:{
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      }
    },
  },
}

export default schema