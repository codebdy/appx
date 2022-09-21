import { ISchema } from '@formily/react'
import { IPropsTab } from '../../../../../../plugin-sdk'

export const schemaTabs:IPropsTab[] = [
  
]

export const schema: ISchema & { Addition?: ISchema } = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
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
