import { IPropsSchema } from '@rxdrag/appx-plugin-sdk'

const schema: IPropsSchema = {
  props: {
    type: 'object',
    properties: {
      icon: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'IconInput',
        'x-component-props': {
        }
      },
      color: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'ColorInput',
        'x-component-props': {
        }
      },
    },
  }
}

export default schema;
