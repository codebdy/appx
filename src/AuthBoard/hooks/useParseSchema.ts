import { useCallback } from "react";
import { ISchema } from '@formily/json-schema'
import { isArr, isObj } from '@designable/shared'
import { useParseLangMessage } from "../../plugin-sdk";
import { IAuthComponent } from "./IAuthComponent";

export function useParseSchema() {
  const p = useParseLangMessage();

  const parse = useCallback((schema?: ISchema): IAuthComponent[] => {
    const coms = [];
    if (!schema || !isObj(schema)) {
      return coms;
    }

    if (schema["x-auth"]) {
      coms.push({
        name: schema.name,
        title: p(schema["x-auth"].authTitle)
      })
    }

    for (const key of Object.keys(schema.properties || {})) {
      coms.push(...parse(schema.properties[key]));
    }

    if (isArr(schema.items)) {
      for (let i = 0; i < schema.items.length; i++) {
        coms.push(...parse(schema.items[i]));
      }
    } else if (schema.items) {
      const properties = (schema.items as any).properties;
      for (const key of Object.keys(properties || {})) {
        coms.push(...parse(properties[key]));
      }
    }
    return coms
  }, [p]);

  return parse;
}