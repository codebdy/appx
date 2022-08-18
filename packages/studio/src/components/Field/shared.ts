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
      'x-component': "SettingsTab.TabPane",
      'x-component-props': {
        tab: 'SettingsForm.Styles'
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

export const createDisplaySchemaTab = () => {
  return {
    'display-tab': {
      type: 'void',
      'x-component': "SettingsTab.TabPane",
      'x-component-props': {
        tab: 'SettingsForm.Display'
      },
      properties: {
        "data-group": {
          type: 'void',
          'x-component': 'CollapseItem',
          'x-reactions': {
            fulfill: {
            },
          },
          properties: {
            "x-data-source": {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-component': 'DataSourceInput',
            },

            "x-field-source": {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-component': 'FieldSourceInput',
            },
            "x-field-params": {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-component': 'FieldParamsInput',
            },
          },
        },
        "field-group": {
          type: 'void',
          'x-component': 'CollapseItem',
          'x-reactions': {
            fulfill: {
            },
          },
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
              'x-reactions': {
                fulfill: {
                  state: {
                    hidden: '{{$form.values["x-decorator"] !== "FormItem"}}',
                  },
                },
              },
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
            'x-reactions': {
              'x-decorator': 'FormItem',
              'x-component': ReactionsSetter,
            },
          }
        },
        "auth-group": {
          type: 'void',
          'x-component': 'CollapseItem',
          'x-reactions': {
            fulfill: {
            },
          },
          properties: {
            viewAuth: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
            },
          }
        },
      },
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
      'x-component': 'SettingsTab.TabPane',
      'x-component-props': {
        tab: "SettingsForm.Properties"
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
            // 'x-decorator': {
            //   type: 'string',
            //   'x-decorator': 'FormItem',
            //   'x-component': FormItemSwitcher,
            // },
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

export const createActionSchemaTab = () => {

  return {
    'action-tab': {
      type: 'void',
      'x-component': "SettingsTab.TabPane",
      'x-component-props': {
        tab: 'SettingsForm.Actions'
      },
      properties: {
        onClick: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
      }
    },
  }
}

export const createFieldSchemaOld = (
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

export const createVoidFieldSchemaOld = (
  component?: ISchema,
  decorator: ISchema = AllSchemas.FormItem
) => {
  return {
    type: 'object',
    properties: {
      tabs: {
        type: 'void',
        'x-component': 'SettingsTab',
        properties: {
          ...createComponentSchemaTab(component, decorator),
          ...createStyleSchemaTab(),
          ...createDisplaySchemaTab(),
          ...createActionSchemaTab(),
        }
      },
    },
  }
}


export enum BindableType {
  EntityArray = "EntityArray",
  Entity = "Entity",
  Attribute = "Attribute",
  Void = "Void",
}

export const createFieldSchema = (
  component: ISchema,
  options: {
    decorator?: ISchema,
    actions?: string[],
    bindable?: BindableType,
    bindExtraSchema?: ISchema,
  }
) => {

}
