import { ISchema } from '@formily/react'

export const Schema: ISchema & {
  HeaderExtra?: ISchema,
  HeaderContent?: ISchema,
  Content?: ISchema,
  TabPanel?: ISchema,
  FooterToolbar?: ISchema,
} = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    subtitle: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    hasBreadcrumb: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    showGoback: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}
