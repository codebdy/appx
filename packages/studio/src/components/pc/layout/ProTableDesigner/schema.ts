import { ISchema } from '@formily/react'

export const ProTableSchema: ISchema & {
  QueryForm?: ISchema,
  TableToolbar?: ISchema,
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
  },
}
