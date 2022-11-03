import { IPropsSchema } from '@rxdrag/appx-plugin-sdk'

export const FormCollapseSchema: IPropsSchema = {
  props: {
    type: 'object',
    properties: {
      accordion: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
      collapsible: {
        type: 'string',
        enum: ['header', 'disabled'],
        'x-decorator': 'FormItem',
        'x-component': 'Radio.Group',
        'x-component-props': {
          defaultValue: 'header',
          optionType: 'button',
        },
      },
      ghost: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
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

}

export const FormCollapsePaneSchema = {
  props: {
    type: 'object',
    properties: {
      collapsible: {
        type: 'string',
        enum: ['header', 'disabled'],
        'x-decorator': 'FormItem',
        'x-component': 'Radio.Group',
        'x-component-props': {
          defaultValue: 'header',
          optionType: 'button',
        },
      },
      header: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
      extra: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
    },
  }
}
