import { useCallback } from "react";
import { IPropsSchema } from "@rxdrag/appx-plugin-sdk";

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

export function useCreateActionsSchemaTab() {
  const create = useCallback((propsSchema: IPropsSchema) => {
    if (!propsSchema.actions?.length) {
      return {}
    }
    return createActionSchemaTab(propsSchema.actions)
  }, [])

  return create
}