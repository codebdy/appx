import { ISchema } from '@formily/react'

export const DataTableSchema: ISchema & { Column?: ISchema, ColumnGroup?: ISchema } = {
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

const Column: ISchema = {
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

DataTableSchema.Column = Column

const ColumnGroup: ISchema = {
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

DataTableSchema.ColumnGroup = ColumnGroup