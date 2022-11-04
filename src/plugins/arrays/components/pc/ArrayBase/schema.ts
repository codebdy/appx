import { IPropsSchema } from "@rxdrag/appx-plugin-sdk";

export const AdditionSchema: IPropsSchema = {
  props: {
    type: 'object',
    properties: {
      method: {
        type: 'string',
        enum: ['push', 'unshift'],
        'x-decorator': 'FormItem',
        'x-component': 'Radio.Group',
        'x-component-props': {
          defaultValue: 'push',
          optionType: 'button',
        },
      },
      defaultValue: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'ValueInput',
      },
    },
  }
}
