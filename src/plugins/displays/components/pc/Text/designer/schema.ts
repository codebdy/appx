import { FieldsType, IPropsSchema } from '@rxdrag/appx-plugin-sdk';
import { TextType } from '../view';

const schema: IPropsSchema = {
  display: { fieldSourceType: FieldsType.Single },
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
      textType: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        'x-component-props': {
          defaultValue: TextType.Text,
        },
        enum: [TextType.Text, TextType.Date],
      },
      formatMask: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-reactions': {
          fulfill: {
            state: {
              visible: '{{$form.values["x-component-props"]?.textType === "Date"}}',
            },
          },
        },
      },
    },
  }
}

export default schema;
