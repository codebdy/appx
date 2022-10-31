import { IPropsSchema } from '@rxdrag/appx-plugin-sdk'

const schema: IPropsSchema = {
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