import { ISchema } from '@formily/react'

export const BooleanViewSchema: ISchema = {
  type: 'object',
  properties: {
    icon: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'IconInput',
      'x-component-props':{
      }
    },
    size:{
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    shape:{
      type: 'string',
      enum: ['circle', 'square'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: 'circle',
        optionType: 'button',
      },
    }
  },
}
