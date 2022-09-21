import { useCallback } from "react";
import { IPropsSchema } from "../../plugin-sdk/model";
import { useCreateActionsSchemaTab } from "./useCreateActionsSchemaTab";
import { useCreateDisplaySchemaTab } from "./useCreateDisplaySchemaTab";
import { useCreatePropsSchemaTab } from "./useCreatePropsSchemaTab";
import { useCreateStyleSchemaTab } from "./useCreateStyleSchemaTab";

export function useCreateFieldSchema() {
  const createPropsTab = useCreatePropsSchemaTab();
  const createStyleTab = useCreateStyleSchemaTab();
  const createDisplayTab = useCreateDisplaySchemaTab();
  const createActionsTab = useCreateActionsSchemaTab();
  const create = useCallback((propsSchema: IPropsSchema) => {
    return {
      type: 'object',
      properties: {
        tabs: {
          type: 'void',
          'x-component': 'SettingsTab',
          properties: {
            ...createPropsTab(propsSchema),
            ...createStyleTab(propsSchema),
            ...createDisplayTab(propsSchema),
            ...createActionsTab(propsSchema),
          }
        },
      },
    }
  }, [createActionsTab, createDisplayTab, createPropsTab, createStyleTab])

  return create;
}