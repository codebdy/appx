import { useCallback, useEffect, useMemo } from 'react';
import { useFieldSchema } from '@formily/react';
import { Schema } from '@formily/json-schema';
import { isArr } from '@formily/shared';
import { useParseLangMessage } from '../../../../hooks/useParseLangMessage';
import { ObservableColumnSource } from './index';

export const isColumnComponent = (schema: Schema) => {
  return schema?.['x-component'] === 'ProTable.Column'
}
export const isColumnGroupComponent = (schema: Schema) => {
  return schema?.['x-component'] === 'ProTable.ColumnGroup'
}

export const useArrayTableSources = () => {
  const p = useParseLangMessage();
  const schema = useFieldSchema();
  useEffect(() => {
    console.log("schema 变化");
  }, [schema]);
  const parseSources = useCallback((schema: Schema): ObservableColumnSource[] => {
    const isColumn = isColumnComponent(schema);
    const isColumnGroup = isColumnGroupComponent(schema);
    if (isColumn || isColumnGroup) {
      if (!schema['x-component-props']?.['dataIndex'] && !schema['name'])
        return [];
      const name = schema['x-component-props']?.['dataIndex'] || schema['name'];
      const columnProps = schema['x-component-props'] || {};
      const display = schema['x-display'];
      columnProps.title = p(columnProps?.title);
      return [
        {
          name,
          display,
          schema,
          columnProps,
          children: schema.reduceProperties((buf, schema) => {
            return buf.concat(parseSources(schema));
          }, []).filter(child => child),
        },
      ];
    } else if (schema.properties) {
      return schema.reduceProperties((buf, schema) => {
        return buf.concat(parseSources(schema));
      }, []);
    }
  }, [p]);

  const parseArrayItems = useCallback((schema: Schema['items']) => {
    if (!schema)
      return [];
    const sources: ObservableColumnSource[] = [];
    const items = isArr(schema) ? schema : [schema];
    return items.reduce((columns, schema) => {
      const item = parseSources(schema);
      if (item) {
        return columns.concat(item);
      }
      return columns;
    }, sources);
  }, [parseSources]);

  const result = useMemo(() => parseArrayItems(schema?.items), [parseArrayItems, schema]);
  return result;
};
