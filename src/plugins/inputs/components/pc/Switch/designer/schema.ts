import { FieldsType, IPropsSchema } from '@rxdrag/appx-plugin-sdk'

export const SwitchSchema: IPropsSchema = {
  display:{
    fieldSourceType: FieldsType.Single,
  },

  props: {
    type: 'object',
    properties: {
      autoFocus: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
      size: {
        type: 'string',
        enum: ['large', 'small', 'default', ''],
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        'x-component-props': {
          defaultValue: 'default',
        },
      },
    },
  }
}
