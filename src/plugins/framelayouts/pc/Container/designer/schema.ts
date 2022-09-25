import { IPropsSchema } from '@rxdrag/appx-plugin-sdk'

const schema: IPropsSchema = {
  props: {
    type: 'object',
    properties: {
      maxWidth:{
        type: 'string',
        enum: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        'x-component-props': {
          defaultValue: 'lg',
        },
      }
    },
  },
}

export default schema