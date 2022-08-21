import { ISchema } from '@formily/react'

export const ButtonSchema: ISchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    'type': {
      type: 'string',
      enum: ['primary', 'ghost', 'dashed', 'link', "text", "default"],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'primary',
      },
    },
    block:{
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    danger:{
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    disabled:{
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    ghost:{
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    icon:{
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'IconInput',
    },
    shape:{
      type: 'string',
      enum: ['default', 'circle', 'round'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'default',
      },
    },
    size: {
      type: 'string',
      enum: ['large', 'middle', 'small'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'middle',
      },
    },
  },
}
