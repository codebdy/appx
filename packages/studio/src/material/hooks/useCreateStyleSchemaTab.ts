import { AllSchemas } from "@designable/formily-antd"
import { useCallback } from "react"
import { IPropsSchema } from "@rxdrag/appx-plugin-sdk"

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

export function useCreateStyleSchemaTab() {
  const create = useCallback((propsSchema: IPropsSchema) => {
    if (!propsSchema?.style === false) {
      return {}
    }
    return createStyleSchemaTab()
  }, [])

  return create
}