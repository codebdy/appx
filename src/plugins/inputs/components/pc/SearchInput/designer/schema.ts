import { FieldsType, IPropsSchema } from '@rxdrag/appx-plugin-sdk'
import { Events } from '~/plugin-sdk';

const schema: IPropsSchema = {
  actions: [Events.onSearch],
  display: {
    fieldSourceType: FieldsType.Multiple,
  },

  props: {
    type: 'object',
    properties: {
      searchStyle: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        'x-component-props': {
          defaultChecked: true,
        },
      },
      isFuzzy: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        'x-component-props': {
          defaultChecked: false,
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