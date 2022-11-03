import { FieldsType, IPropsSchema } from '@rxdrag/appx-plugin-sdk'

const schema: IPropsSchema = {
  display:{
    fieldSourceType: FieldsType.Single,
  },

  props: {
    type: 'object',
    properties: {
      inline: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        'x-component-props': {
        },
      },
      multiline: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        'x-component-props': {
        },
      },
      rows: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
        'x-reactions': {
          fulfill: {
            state: {
              visible: '{{$form.values["x-component-props"]?.multiline === true}}',
            },
          },
        },
      },
      addonBefore: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
      addonAfter: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
      prefix: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
      suffix: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
      allowClear: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
      bordered: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        'x-component-props': {
          defaultChecked: true,
        },
      },
      maxLength: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
      },
      placeholder: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
      size: {
        type: 'string',
        enum: ['large', 'small', 'middle', null],
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        'x-component-props': {
          defaultValue: 'middle',
        },
      },
    },
  }
}

export default schema;