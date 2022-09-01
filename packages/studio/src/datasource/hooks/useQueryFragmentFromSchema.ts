import { Schema } from '@formily/json-schema';
import { useCallback, useMemo } from 'react';
import { FieldSourceType } from '../model/IFieldSource';
import { IFragmentParams } from './IFragmentParams';

export interface IGqlField {
  name: string;
  fields: IGqlField[];
  gql?: string;
}

export function useQueryFragmentFromSchema(schema?: Schema): IFragmentParams {
  const getFragmentFromSchema = useCallback((schema, fields: IGqlField[], key?: string) => {
    let currentFields = fields;
    if (schema?.["x-field-source"] && key) {
      const subFields = schema?.["x-field-source"]?.sourceType === FieldSourceType.Association ? [{ name: "id", fields: [] }] : [];
      fields.push({
        name: key,
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

  const makeOneField = useCallback((field: IGqlField) => {
    const subFieldGql = field.fields.map(subField => makeOneField(subField)).join("\n")
    const gql = field.name + (subFieldGql ? `{\n${subFieldGql}\n}` : "");
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