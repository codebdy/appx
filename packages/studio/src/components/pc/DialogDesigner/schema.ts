import { ISchema } from '@formily/react'

export const DialogSchema: ISchema & {
  Content?: ISchema,
  Footer?: ISchema,
  Title?: ISchema,
} = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'MultiLangInput',
    },
    'type': {
      type: 'string',
      enum: ['primary', 'ghost', 'dashed', 'link', "text", "default"],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'primary',
      },
    },
    block: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    danger: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    disabled: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    ghost: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    showDropdownIcon: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultValue: 'true',
      },
    },
    icon: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'IconInput',
    },
    shape: {
      type: 'string',
      enum: ['default', 'circle', 'round'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'default',
      },
    },
    size: {
      type: 'string',
      enum: ['large', 'middle', 'small'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'middle',
      },
    },
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
