import { ISchema } from '@formily/react'

export const PageContainerSchema: ISchema & {
  HeaderActions?: ISchema,
  HeaderContent?: ISchema,
  HeaderContentExtra?: ISchema,
  Content?: ISchema,
  TabPanel?: ISchema,
  FooterToolbar?: ISchema,
} = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'MultiLangInput',
    },
    subtitle: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'MultiLangInput',
    },
    hasBreadcrumb: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    hasGobackButton: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    hasActions: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    hasHeaderContent: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    hasHeaderContentExtra: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    hasTabs: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    hasFooterToolbar: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}