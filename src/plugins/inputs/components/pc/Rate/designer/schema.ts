import { FieldsType, IPropsSchema } from '@rxdrag/appx-plugin-sdk'

export const RateSchema: IPropsSchema = {
  display:{
    fieldSourceType: FieldsType.Single,
  },

  props: {
    type: 'object',
    properties: {
      allowClear: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        'x-component-props': {
          defaultChecked: true,
        },
      },
      count: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
        'x-component-props': {
          defaultValue: 5,
        },
      },
      allowHalf: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
      tooltips: {
        'x-decorator': 'FormItem',
        'x-component': 'ValueInput',
        'x-component-props': {
          include: ['EXPRESSION'],
        },
      },
      autoFocus: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
    },
  }
}
