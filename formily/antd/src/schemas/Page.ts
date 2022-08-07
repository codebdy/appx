import { ISchema } from '@formily/react'

export const Page: ISchema & { Extra?: ISchema } = {
  type: 'object',
  properties: {
    // title: {
    //   type: 'string',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Input',
    // },
    extra: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    cardTypes: {
      type: 'string',
      enum: ["inner", ""],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: '',
        optionType: 'button',
      },
    },
    bordered: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true,
      },
    },
  },
}

Page.Extra = {
  type: 'object',
  properties: {
    gridSpan: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        defaultValue: 1,
      },
    },
  },
}
