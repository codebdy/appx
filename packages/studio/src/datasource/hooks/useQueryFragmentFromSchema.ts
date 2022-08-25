import { Schema } from '@formily/json-schema';
import { useCallback, useMemo } from 'react';
import { IFragmentParams } from './IFragmentParams';

export function useQueryFragmentFromSchema(schema?: Schema): IFragmentParams {
  const getFragmentFromSchema = useCallback((schema) => {
    console.log("ccc mmm", schema?.["x-field-source"]);
    if (schema?.properties) {
      for (const key of Object.keys(schema?.properties)) {
        getFragmentFromSchema(schema.properties[key])
      }
    }
    if (schema?.items?.properties) {
      for (const key of Object.keys(schema?.items?.properties)) {
        getFragmentFromSchema(schema.items.properties[key])
      }
    }

  }, [])

  const fragment = useMemo(() => getFragmentFromSchema(schema), [getFragmentFromSchema, schema])
  return {}
}