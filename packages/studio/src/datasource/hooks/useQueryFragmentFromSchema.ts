import { Schema } from '@formily/json-schema';
import { useCallback, useMemo } from 'react';
import { IFragmentParams } from './IFragmentParams';

export interface IGqlField {
  name: string;
  variables?: any;
  fields: IGqlField[];
}

export function useQueryFragmentFromSchema(schema?: Schema): IFragmentParams {
  const getFragmentFromSchema = useCallback((schema, fields: IGqlField[], key?: string) => {
    let currentFields = fields;
    if (schema?.["x-field-source"] && key) {
      const subFields = [];
      fields.push({
        name: key,
        variables: schema?.["x-field-source"].variables,
        fields: subFields,
      })
      currentFields = subFields;
    }
    else if (!key) {//根节点
      //选择列表控件
      if (schema?.['x-component-props']?.["labelField"]) {
        const subFields = [];
        fields.push({
          name: schema?.['x-component-props']?.["labelField"],
          fields: subFields,
        })
      }
      if (schema?.['x-component-props']?.["valueField"]) {
        const subFields = [];
        fields.push({
          name: schema?.['x-component-props']?.["valueField"],
          fields: subFields,
        })
      }
    }
    if (schema?.properties) {
      for (const key of Object.keys(schema?.properties)) {
        getFragmentFromSchema(schema.properties[key], currentFields, key)
      }
    }
    if (schema?.items?.properties) {
      for (const key of Object.keys(schema?.items?.properties)) {
        getFragmentFromSchema(schema.items.properties[key], currentFields, key)
      }
    }
  }, [])

  const makeOneField = useCallback((field: IGqlField, variables: any) => {
    const args = field.variables && `(${Object.keys(field.variables).map(key => `${key}:$${key}`).join(",")})`;
    Object.assign(variables, field.variables);
    const subFieldGql = field.fields.map(subField => makeOneField(subField, variables)).join("\n")
    const gql = field.name + (args || "") + (subFieldGql ? `{\n${subFieldGql}\n}` : "");
    return gql;
  }, []);

  const fragment = useMemo(() => {
    const fields: IGqlField[] = [];
    getFragmentFromSchema(schema, fields)

    if (fields?.length > 0) {
      let variables = {}
      const fratmentParams: IFragmentParams = {
        gql: fields.length > 0 ? `{\n${fields.map(field => makeOneField(field, variables)).join("\n ")}\n}` : "",
        variables
      }

      return fratmentParams;
    }
    return {}
  }, [getFragmentFromSchema, makeOneField, schema]);

  return fragment
}