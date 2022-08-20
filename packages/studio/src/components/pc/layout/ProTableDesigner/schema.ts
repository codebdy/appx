import { ISchema } from '@formily/react'

export const ProTableSchema: ISchema & {
  QueryForm?: ISchema,
  QueryTable?: ISchema,
  TableToolbar?: ISchema,
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
