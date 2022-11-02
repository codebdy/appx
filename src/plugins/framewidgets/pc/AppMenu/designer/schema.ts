import { IPropsSchema } from '@rxdrag/appx-plugin-sdk'

const schema: IPropsSchema = {
  props: {
    type: 'object',
    properties: {
      mode: {
        type: 'string',
        enum: ['vertical', 'horizontal', 'inline'],
        'x-decorator': 'FormItem',
        'x-component': 'Radio.Group',
        'x-component-props': {
          defaultValue: 'inline',
          optionType: 'button',
        },
      },
    },
  },
}

export default schema