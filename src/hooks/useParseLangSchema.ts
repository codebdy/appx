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

    schema.title = p(schema.title);

    for (const key of Object.keys(schema.properties || {})) {
      schema.properties[key] = parse(schema.properties[key]);
    }

    if (isArr(schema.items)) {
      for (let i = 0; i < schema.items.length; i++) {
        schema.items[i] = parse(schema.items[i]);
      }
    } else if (schema.items) {
      const properties = (schema.items as any).properties;
      for (const key of Object.keys(properties || {})) {
        properties[key] = parse(properties[key]);
      }
    }
    return schema
  }, [p]);

  return parse;
}