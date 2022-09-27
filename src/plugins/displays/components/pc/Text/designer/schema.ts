import { IPropsSchema } from '@rxdrag/appx-plugin-sdk';

const schema: IPropsSchema = {
  props: {
    type: 'object',
    properties: {
      content: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'MultiLangInput',
        'x-component-props': {
          multiline: true
        }
      },
      mode: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        'x-component-props': {
          defaultValue: 'normal',
        },
        enum: ['h1', 'h2', 'h3', 'p', 'normal'],
      },
    },
  }
}

export default schema;
