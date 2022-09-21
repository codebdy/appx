import { useCallback } from "react";
import { IPropsSchema } from "../../plugin-sdk/model";
import { useCreatePropsSchemaTab } from "./useCreatePropsSchemaTab";

export function useCreateFieldSchema() {
  const createPropsSchema = useCreatePropsSchemaTab();
  const create = useCallback((propsSchema: IPropsSchema) => {
    return {
      type: 'object',
      properties: {
        tabs: {
          type: 'void',
          'x-component': 'SettingsTab',
          properties: {
            ...createPropsSchema(propsSchema),
            ...(!options?.noStyleTab ? createStyleSchemaTab() : {}),
            ...(!options?.noDisplayTab ? createDisplaySchemaTab(options) : {}),
            ...(options?.actions ? createActionSchemaTab(options?.actions) : {}),
          }
        },
      },
    }
  }, [])

  return create;
}