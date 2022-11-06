import { useCallback } from "react";
import { useMe } from "~/plugin-sdk";
import { useAppParams } from "~/plugin-sdk/contexts/app";
import { isArr, isObj } from '@designable/shared'
import { ISchema } from "@formily/react";

export function useCheckComponentAuth() {
  const appParams = useAppParams();
  const me = useMe();
  const check = useCallback((schema?: ISchema) => {
    if (!schema || !isObj(schema)) {
      return schema;
    }

    for (const key of Object.keys(schema.properties || {})) {
      if (me.isSupper || me.isDemo) {
        continue;
      }
      for (const auth of appParams.componentAuthConfigs || []) {
        if (auth.componentId === key) {
          if (auth.refused) {
            delete schema.properties[key];
            continue
          }
        }
      }
      schema.properties[key] = check(schema.properties[key])
    }

    if (isArr(schema.items)) {
      console.error("不可思议的错误")
    } else if (schema.items) {
      const properties = (schema.items as any).properties;
      for (const key of Object.keys(properties || {})) {
        if (me.isSupper || me.isDemo) {
          continue;
        }
        for (const auth of appParams.componentAuthConfigs || []) {
          if (auth.componentId === key) {
            if (auth.refused) {
              delete properties[key];
              continue
            }
          }
        }
        properties[key] = check(properties[key])
      }
    }
    return schema
  }, [appParams]);

  return check;
}