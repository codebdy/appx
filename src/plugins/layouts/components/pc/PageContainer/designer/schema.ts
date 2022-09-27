import { ISchema } from '@formily/react'
import { IPropsSchema } from '@rxdrag/appx-plugin-sdk';

const schema: IPropsSchema = {
  props: {
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

}

export default schema;
