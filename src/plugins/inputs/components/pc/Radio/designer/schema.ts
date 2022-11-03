import { FieldsType, IPropsSchema } from '@rxdrag/appx-plugin-sdk'

// export const RadioSchema: IPropsSchema = {
//   display: {
//     fieldSourceType: FieldsType.Single,
//   },

//   props: {
//     type: 'object',
//     properties: {
//       autoFocus: {
//         type: 'boolean',
//         'x-decorator': 'FormItem',
//         'x-component': 'Switch',
//       },
//     },
//   }
// }


export const RadioGroupSchema: IPropsSchema = {
  display: {
    fieldSourceType: FieldsType.Single,
  },

  props: {
    type: 'object',
    properties: {
      optionType: {
        type: 'string',
        enum: ['default', 'button'],
        'x-decorator': 'FormItem',
        'x-component': 'Radio.Group',
        'x-component-props': {
          defaultValue: 'default',
          optionType: 'button',
        },
      },
      buttonStyle: {
        type: 'string',
        enum: ['outline', 'solid'],
        'x-decorator': 'FormItem',
        'x-component': 'Radio.Group',
        'x-component-props': {
          defaultValue: 'outline',
          optionType: 'button',
        },
      },
    },
  }
}
