import { FieldsType, IPropsSchema } from '@rxdrag/appx-plugin-sdk'

export const DataTableSchema: IPropsSchema = {
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
    },
  }
}

export const ColumnSchema: IPropsSchema = {
  display: {
    //fieldSourceType: FieldsType.Single,
    hasPropTitle: true,
  },
  props: {
    type: 'object',
    properties: {
      sortable: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        'x-component-props': {
          defaultChecked: false,
        },
      },
      defaultSortOrder: {
        type: 'string',
        enum: ['ascend', 'descend', ''],
        'x-decorator': 'FormItem',
        'x-component': 'Radio.Group',
        'x-component-props': {
          defaultValue: '',
          optionType: 'button',
        },
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
      // colSpan: {
      //   type: 'number',
      //   'x-decorator': 'FormItem',
      //   'x-component': 'NumberPicker',
      // },
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

export const ColumnGroupSchema: IPropsSchema = {
  display: {
    fieldSourceType: FieldsType.Single, 
    hasPropTitle: true
  },
  props: {
    type: 'object',
    properties: {
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