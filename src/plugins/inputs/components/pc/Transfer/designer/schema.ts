import { FieldsType, IPropsSchema } from '@rxdrag/appx-plugin-sdk'

export const TransferSchema: IPropsSchema = {
  display: {
    fieldSourceType: FieldsType.Single,
  },

  props: {
    type: 'object',
    properties: {
      oneWay: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
      showSearch: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
      showSearchAll: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        'x-component-props': {
          defaultChecked: true,
        },
      },
      filterOption: {
        'x-decorator': 'FormItem',
        'x-component': 'ValueInput',
        'x-component-props': {
          include: ['EXPRESSION'],
        },
      },
      operations: {
        'x-decorator': 'FormItem',
        'x-component': 'ValueInput',
        'x-component-props': {
          include: ['EXPRESSION'],
        },
      },
      titles: {
        'x-decorator': 'FormItem',
        'x-component': 'ValueInput',
        'x-component-props': {
          include: ['EXPRESSION'],
        },
      },
    },
  }
}
