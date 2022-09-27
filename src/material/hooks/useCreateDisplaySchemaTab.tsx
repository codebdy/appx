import { useCallback } from "react";
import { FieldsType, IDisplayTabOptions, IPropsSchema } from "@rxdrag/appx-plugin-sdk";
import {
  ReactionsSetter,
  ValidatorSetter,
} from '@designable/formily-setters'

export const createDisplaySchemaTab = (options?: IDisplayTabOptions) => {
  const { dataBindSourceType, fieldSourceType, hasPropTitle } = options || {}
  const dataBind =
    dataBindSourceType
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
            "run": '$form.values["x-component-props"].associationType = $form.values["x-field-source"]?.["associationType"]'
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

  const dataGroup = (dataBindSourceType || fieldSourceType)
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


export function useCreateDisplaySchemaTab() {
  const create = useCallback((propsSchema: IPropsSchema) => {
    return createDisplaySchemaTab(propsSchema?.display)
  }, [])

  return create
}