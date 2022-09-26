import { IPropsSchema } from '@rxdrag/appx-plugin-sdk'

const schema: IPropsSchema = {
  props: {
    type: 'object',
    properties: {
      flexFlow:{
        type: 'string',
        enum: ['column', 'row'],
        'x-decorator': 'FormItem',
        'x-component': 'Radio.Group',
        'x-component-props': {
          defaultValue: 'row',
          optionType: 'button',
        },
      },
    },
  },
}

export default schema