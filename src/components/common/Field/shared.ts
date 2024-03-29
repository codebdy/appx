









/***********************************
 * 
 * 
 * 
 * 本文件代码已废除，择机删除
 * 
 * 
 * 
 */














import { ISchema } from '@formily/json-schema'
import {
  ReactionsSetter,
  ValidatorSetter,
} from '@designable/formily-setters'
import { AllSchemas } from '@designable/formily-antd/lib/schemas'

export enum FieldsType {
  Multiple = "Multiple",
  Single = "Single"
}

export interface IFieldOptions {
  decorator?: ISchema,
  actions?: string[],
  hasDataBindSource?: boolean,
  fieldSourceType?: FieldsType,
  hasPropTitle?: boolean,
  noDisplayTab?: boolean,
  noStyleTab?: boolean,
}

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
          // 'x-reactions': {
          //   fulfill: {
          //     state: {
          //       visible: '{{!!$form.values["x-component"]}}',
          //     },
          //   },
          // },
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

export const createDisplaySchemaTab = (options?: IFieldOptions) => {
  const { hasDataBindSource, fieldSourceType, hasPropTitle } = options || {}
  const dataBind =
    hasDataBindSource
      ?
      {
        'x-component-props': {
          type: 'object',
          properties: {
            dataBind: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-component': 'DataSourceInput',
            },
          }
        },
      }
      :
      {}

  const fieldSource = fieldSourceType
    ?
    {
      "x-field-source": {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'FieldSourceInput',
        'x-component-props': {
          mode: fieldSourceType === FieldsType.Multiple ? "multiple" : undefined,
        },
        "x-reactions": {
          fulfill: {
            "run":  '$form.values["x-component-props"].associationType = $form.values["x-field-source"]?.["associationType"]'
          }
        }
      },
      "x-field-params": {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'FieldParamsInput',
        'x-reactions': {
          fulfill: {
            state: {
              visible: '{{$form.values["x-field-source"]?.["sourceType"] === "Method" || $form.values["x-field-source"]?.["sourceType"] === "Association"}}',
            },
          },
        },
      },
    }
    :
    {}

  const dataGroup = (hasDataBindSource || fieldSourceType)
    ?
    ({
      "data-group": {
        type: 'void',
        'x-component': 'CollapseItem',
        'x-reactions': {
          fulfill: {
          },
        },
        properties: {
          ...dataBind,
          ...fieldSource
        },
      },
    })
    :
    {}

  const dataFieids = fieldSourceType === FieldsType.Single ?
    {
      default: {
        'x-decorator': 'FormItem',
        'x-component': 'ValueInput',
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
      description: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
      },
    }
    :
    {}

  const propTitle = hasPropTitle ?
    {
      'x-component-props': {
        type: "object",
        properties: {
          title: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'MultiLangInput',
            'x-reactions': {
              fulfill: {
                state: {
                  value: '{{$form.values["x-field-source"]?.label||$form.values["x-field-source"]?.name ||""}}',
                },
              },
            },
          },
        }
      }
    }
    :
    {}
  return {
    'display-tab': {
      type: 'void',
      'x-component': "SettingsTab.TabPane",
      'x-component-props': {
        tab: 'SettingsForm.Display'
      },
      properties: {
        ...dataGroup,
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
              'x-reactions': {
                fulfill: {
                  dependencies: ['x-field-source'],
                  state: {
                    value: '{{$form.values["x-field-source"]?.name ||""}}',
                    disabled: '{{!!$form.values["x-field-source"]?.name}}',
                  },
                },
              },
            },
            title: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-component': 'MultiLangInput',
              'x-reactions': {
                fulfill: {
                  state: {
                    hidden: '{{$form.values["x-decorator"] !== "FormItem"}}',
                    value: '{{$form.values["x-field-source"]?.label||$form.values["x-field-source"]?.name ||""}}',
                  },
                },
              },
            },
            ...propTitle,
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
            ...dataFieids
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
            'x-auth': {
              type: "object",
              properties: {
                enableAuth:{
                  type: 'boolean',
                  'x-decorator': 'FormItem',
                  'x-component': 'Switch',
                },
                authTitle:{
                  type: 'string',
                  'x-decorator': 'FormItem',
                  'x-component': 'MultiLangInput',
                }
              }
            }
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
          // 'x-reactions': {
          //   fulfill: {
          //     state: {
          //       visible: '{{!!$form.values["x-component"]}}',
          //     },
          //   },
          // },
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

export const createActionSchemaTab = (actions: string[]) => {

  const actionsObj = {} as any;

  for (const action of actions) {
    actionsObj[action] = {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'ActionInput',
    }
  }
  return {
    'action-tab': {
      type: 'void',
      'x-component': "SettingsTab.TabPane",
      'x-component-props': {
        tab: 'SettingsForm.Actions'
      },
      properties: {
        'x-component-props': {
          type: "object",
          properties: {
            ...actionsObj,
          }
        }
      }
    },
  }
}

export const createFieldSchema = (
  component: ISchema | undefined,
  options?: IFieldOptions
) => {
  return {
    type: 'object',
    properties: {
      tabs: {
        type: 'void',
        'x-component': 'SettingsTab',
        properties: {
          ...component && createComponentSchemaTab(component, options?.decorator || (options?.fieldSourceType && AllSchemas.FormItem)),
          ...(!options?.noStyleTab ? createStyleSchemaTab() : {}),
          ...(!options?.noDisplayTab ? createDisplaySchemaTab(options) : {}),
          ...(options?.actions ? createActionSchemaTab(options?.actions) : {}),
        }
      },
    },
  }

}
