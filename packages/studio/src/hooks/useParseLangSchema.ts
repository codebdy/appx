import { useCallback } from "react";
import { useParseLangMessage } from "./useParseLangMessage";
import { ISchema } from '@formily/json-schema'
import { isArr, isObj } from '@designable/shared'

export const LANG_RESOURCE_PREFIX = "$src:";
export const LANG_INLINE_PREFIX = "$inline:"

export function useParseLangSchema() {
  const p = useParseLangMessage();

  const parse = useCallback((schema?: ISchema) => {
    if (!schema || !isObj(schema)) {
      return schema;
    }

    const newSchema:ISchema = JSON.parse(JSON.stringify(schema));

    newSchema.title = p(newSchema.title);

    for (const key of Object.keys(newSchema.properties || {})) {
      newSchema.properties[key] = parse(newSchema.properties[key]);
    }

    if (isArr(newSchema.items)) {
      for (let i = 0; i < newSchema.items.length; i++) {
        newSchema.items[i] = parse(newSchema.items[i]);
      }
    } else {
      for (const key of Object.keys(newSchema.items || {})) {
        newSchema.items[key] = parse(newSchema.items[key]);
      }
    }
    return newSchema
  }, [p]);

  return parse;
}