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
          ...(!options?.noStyleTab ? createStyleSchemaTab() : {}),
          ...(!options?.noDisplayTab ? createDisplaySchemaTab(options) : {}),
          ...(options?.actions ? createActionSchemaTab(options?.actions) : {}),
        }
      },
    },
  }
}
