import { FieldsType, IPropsSchema } from '@rxdrag/appx-plugin-sdk'

export const InputSchema: IPropsSchema = {
  display:{
    fieldSourceType: FieldsType.Single,
  },

  props: {
    type: 'object',
    properties: {
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

export const TextAreaSchema: IPropsSchema = {
  display:{
    fieldSourceType: FieldsType.Single,
  },
  
  props: {
    type: 'object',
    properties: {
      rows: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
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
      autoSize: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
      showCount: {
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
    },
  }

}
