import { IPropsSchema } from '@rxdrag/appx-plugin-sdk'

const schema: IPropsSchema = {
  actions: ["onClick"],
  props: {
    type: 'object',
    properties: {
      placement: {
        type: 'string',
        enum: ["bottom", "bottomLeft", "bottomRight", "top", "topLeft", "topRight"],
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        'x-component-props': {
          defaultValue: 'bottomLeft',
        },
      },
      trigger: {
        type: 'string',
        enum: ["click", "hover", "contextMenu"],
        'x-decorator': 'FormItem',
        'x-component': 'Checkbox.Group',
        'x-component-props': {
          defaultValue: ['click'],
          optionType: 'button',
        },
      }
    },
  }

}

export default schema;