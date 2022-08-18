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

export const createDisplaySchemaTab = (
  hasDataBindSource?: boolean,
  isDataField?: boolean,
) => {
  const dataBindSource =
    hasDataBindSource
      ?
      {
        'x-component-props': {
          type: 'object',
          properties: {
            dataBindSource: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-component': 'DataSourceInput',
            },
          }
        },
      }
      :
      {}

  const fieldSource = isDataField
    ?
    {
      "x-field-source": {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'FieldSourceInput',
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

  const dataGroup = (hasDataBindSource || isDataField)
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
          ...dataBindSource,
          ...fieldSource
        },
      },
    })
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
                    value: '{{$form.values["x-field-source"]?.name}}',
                    disabled: '{{!!$form.values["x-field-source"]?.name}}',
                  },
                },
              },
            },
            title: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
              'x-reactions': {
                fulfill: {
                  state: {
                    hidden: '{{$form.values["x-decorator"] !== "FormItem"}}',
                    value: '{{$form.values["x-field-source"]?.label}}',
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

export const createFieldSchema = (
  component: ISchema,
  options?: {
    decorator?: ISchema,
    actions?: string[],
    hasDataBindSource?: boolean,
    isDataField?: boolean,
    noDisplayTab?: boolean,
  }
) => {
  return {
    type: 'object',
    properties: {
      tabs: {
        type: 'void',
        'x-component': 'SettingsTab',
        properties: {
          ...createComponentSchemaTab(component, options?.decorator || (options?.isDataField && AllSchemas.FormItem)),
          ...createStyleSchemaTab(),
          ...(!options?.noDisplayTab ? createDisplaySchemaTab(options?.hasDataBindSource, options?.isDataField) : {}),
          ...(options?.actions ? createActionSchemaTab(options?.actions) : {}),
        }
      },
    },
  }

}
