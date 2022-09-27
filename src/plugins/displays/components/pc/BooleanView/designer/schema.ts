import { FieldsType, IPropsSchema } from '@rxdrag/appx-plugin-sdk'

const schema: IPropsSchema = {
  display:{ fieldSourceType: FieldsType.Single },
  props: {
    type: 'object',
    properties: {
      trueIcon: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'IconInput',
        'x-component-props': {
        }
      },
      falseIcon: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'IconInput',
        'x-component-props': {
        }
      },
    },
  }
}

export default schema;
