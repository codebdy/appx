import { ISchema } from '@formily/react'

export const ProTableSchema: ISchema & {
  QueryForm?: ISchema,
  TableToolbar?: ISchema,
  TableToolbarContent?: ISchema,
  TableToolbarActions?: ISchema,
  TableBatchActions?: ISchema,
} = {
  type: 'object',
  properties: {
    hasQueryForm: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    hasToolbar: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    selectable:{
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true,
      },
    },
    paginationPosition: {
      type: 'string',
      enum: ['bottomLeft', 'bottomRight', 'bottomCenter'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: 'bottomRight',
        optionType: 'button',
      },
    },
    pageSize: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
  },
}
