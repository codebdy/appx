import { useCallback } from "react"
import { IPropsSchema } from "../../plugin-sdk"
import { ISchema } from '@formily/json-schema'
import { AllSchemas } from "@designable/formily-antd"

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

export function useCreatePropsSchemaTab() {
  const create = useCallback((propsSchema: IPropsSchema) => {
    if (!propsSchema.props || Object.keys(propsSchema.props).length === 0) {
      return {}
    }
    return createComponentSchemaTab(propsSchema.props, propsSchema.decorator === true && AllSchemas.FormItem)
  }, [])

  return create
}