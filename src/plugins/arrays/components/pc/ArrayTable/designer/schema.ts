import { FieldsType, IPropsSchema } from '@rxdrag/appx-plugin-sdk'

export const ArrayTableSchema: IPropsSchema = {
  display:{
    fieldSourceType: FieldsType.Single,
  },
  
  props: {
    type: 'object',
    properties: {
      bordered: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        'x-component-props': {
          defaultChecked: true,
        },
      },
      showHeader: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        'x-component-props': {
          defaultChecked: true,
        },
      },
      sticky: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
      size: {
        type: 'string',
        enum: ['large', 'small', 'middle'],
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        'x-component-props': {
          defaultValue: 'small',
        },
      },
      tableLayout: {
        type: 'string',
        enum: ['auto', 'fixed'],
        'x-decorator': 'FormItem',
        'x-component': 'Radio.Group',
        'x-component-props': {
          defaultValue: 'auto',
          optionType: 'button',
        },
      },
    },
  }
}

export const ArrayTableColumnSchema: IPropsSchema = {
  props: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
      align: {
        type: 'string',
        enum: ['left', 'right', 'center'],
        'x-decorator': 'FormItem',
        'x-component': 'Radio.Group',
        'x-component-props': {
          defaultValue: 'left',
          optionType: 'button',
        },
      },
      colSpan: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
      },
      width: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
      },
      fixed: {
        type: 'string',
        enum: ['left', 'right', false],
        'x-decorator': 'FormItem',
        'x-component': 'Radio.Group',
        'x-component-props': {
          optionType: 'button',
        },
      },
    },
  }
}
