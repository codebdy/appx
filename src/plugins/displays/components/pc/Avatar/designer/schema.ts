import { FieldsType, IPropsSchema } from '@rxdrag/appx-plugin-sdk'

const schema: IPropsSchema = {
  display: {
    fieldSourceType: FieldsType.Single,
  },
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
      size: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
      },
      shape: {
        type: 'string',
        enum: ['circle', 'square'],
        'x-decorator': 'FormItem',
        'x-component': 'Radio.Group',
        'x-component-props': {
          defaultValue: 'circle',
          optionType: 'button',
        },
      }
    },
  }
}
export default schema;
