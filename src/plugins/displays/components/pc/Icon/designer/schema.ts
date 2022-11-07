import { FieldsType, IPropsSchema } from '@rxdrag/appx-plugin-sdk';

const schema: IPropsSchema = {
  display: { fieldSourceType: FieldsType.Single },
  props: {
    type: 'object',
    properties: {
      icon: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'IconInput',
      },
      size: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
        'x-component-props': {
          multiline: true
        }
      },
    },
  }
}

export default schema;
