import { ISchema } from '@formily/json-schema'
import {
  ReactionsSetter,
  DataSourceSetter,
  ValidatorSetter,
} from '@designable/formily-setters'
import { AllSchemas } from '@designable/formily-antd/lib/schemas'

export const createStyleSchemaTab = () => {
  return {
    'style-tab': {
      type: 'void',
      'x-component': 'FormTab.TabPane',
      'x-component-props': {
        tab: 'settings.styles',
      },
      properties: {
        'component-style-group': {
          type: 'void',
          'x-component': 'CollapseItem',
          'x-component-props': { defaultExpand: true },
          'x-reactions': {
            fulfill: {
              state: {
                visible: '{{!!$form.values["x-component"]}}',
              },
            },
          },
          properties: {
            'x-component-props.style': AllSchemas.CSSStyle,
          },
        },
        'decorator-style-group': {
          type: 'void',
          'x-component': 'CollapseItem',
          'x-component-props': { defaultExpand: false },
          'x-reactions': {
            fulfill: {
              state: {
                visible: '{{!!$form.values["x-decorator"]}}',
              },
            },
          },
          properties: {
            'x-decorator-props.style': AllSchemas.CSSStyle,
          },
        },
      }
    },
  }
}

export const createComponentSchemaTab = (
  component: ISchema,
  decorator: ISchema
) => {
  return {
    'component-tab': {
      type: 'void',
      'x-component': 'FormTab.TabPane',
      'x-component-props': {
        tab: '属性',
      },
      properties: {
        'component-group': component && {
          type: 'void',
          'x-component': 'CollapseItem',
          'x-reactions': {
            fulfill: {
              state: {
                visible: '{{!!$form.values["x-component"]}}',
              },
            },
          },
          properties: {
            'x-component-props': component,
          },
        },
        'decorator-group': decorator && {
          type: 'void',
          'x-component': 'CollapseItem',
          'x-component-props': { defaultExpand: false },
          'x-reactions': {
            fulfill: {
              state: {
                visible: '{{!!$form.values["x-decorator"]}}',
              },
            },
          },
          properties: {
            'x-decorator-props': decorator,
          },
        },
      }
    },
  }
}

export const createFieldSchema = (
  component?: ISchema,
  decorator: ISchema = AllSchemas.FormItem
): ISchema => {
  return {
    type: 'object',
    properties: {
      'field-group': {
        type: 'void',
        'x-component': 'CollapseItem',
        properties: {
          name: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
          },
          title: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
          },
          description: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
          },
          'x-display': {
            type: 'string',
            enum: ['visible', 'hidden', 'none', ''],
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              defaultValue: 'visible',
            },
          },
          'x-pattern': {
            type: 'string',
            enum: ['editable', 'disabled', 'readOnly', 'readPretty', ''],
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              defaultValue: 'editable',
            },
          },
          default: {
            'x-decorator': 'FormItem',
            'x-component': 'ValueInput',
          },
          enum: {
            'x-decorator': 'FormItem',
            'x-component': DataSourceSetter,
          },
          'x-reactions': {
            'x-decorator': 'FormItem',
            'x-component': ReactionsSetter,
          },
          'x-validator': {
            type: 'array',
            'x-component': ValidatorSetter,
          },
          required: {
            type: 'boolean',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
          },
        },
      },
      ...createComponentSchemaTab(component, decorator),
    },
  }
}

export const createVoidFieldSchema = (
  component?: ISchema,
  decorator: ISchema = AllSchemas.FormItem
) => {
  return {
    type: 'object',
    properties: {
      collapse: {
        type: 'void',
        'x-component': 'FormTab',
        'x-component-props': {
          formTab: '{{formTab}}',
        },
        properties: {
          ...createComponentSchemaTab(component, decorator),
          ...createStyleSchemaTab(),
          'data-tab': {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': {
              tab: '数据',
            },
          },
          'action-tab': {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': {
              tab: '动作',
            },
          },
        }

      },
    },
  }
}
