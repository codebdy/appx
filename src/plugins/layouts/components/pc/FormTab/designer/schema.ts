import { IPropsSchema } from '@rxdrag/appx-plugin-sdk'

export const FormTabSchema: IPropsSchema = {
  props: {
    type: 'object',
    properties: {
      animated: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
      centered: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
      size: {
        type: 'string',
        enum: ['large', 'small', 'default', null],
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        'x-component-props': {
          defaultValue: 'default',
        },
      },
      type: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Radio.Group',
        'x-component-props': {
          defaultValue: 'line',
          optionType: 'button',
        },
      },
    },
  }

}

export const FormTabPaneSchema = {
  props: {
    type: 'object',
    properties: {
      tab: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
    },
  }
}
