import { FieldsType, IPropsSchema } from '@rxdrag/appx-plugin-sdk'
import { InputSchema } from '../../Input/designer/schema'

export const PasswordSchema: IPropsSchema = {
  display:{
    fieldSourceType: FieldsType.Single,
  },

  props: {
    type: 'object',
    properties: {
      ...(InputSchema.props.properties as any),
      checkStrength: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
    },
  }
}
