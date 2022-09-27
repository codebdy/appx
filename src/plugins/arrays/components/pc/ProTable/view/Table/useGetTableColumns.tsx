import { TableProps } from 'antd';
import React, { useCallback } from 'react';
import { ArrayBase } from "@formily/antd";
import {
  RecursionField,
  Field as ReactField,
  VoidField
} from '@formily/react';
import { Schema } from '@formily/react';
import { ObservableColumnSource, } from './index';
import { isColumnComponent, isColumnGroupComponent } from './useArrayTableSources';
import { CellRoot } from './CellRoot';
import { TextView } from './TextView';

export function useGetTableColumns() {
  const getTableColumns = useCallback((sources: ObservableColumnSource[], parentGroupNames: string[] = []): TableProps<any>['columns'] => {
    return sources?.reduce((buf, source, key, index) => {
      const { name, columnProps, schema, children /*, display*/ } = source || {};
      //if (display !== 'visible') return buf
      if (!isColumnComponent(schema) && !isColumnGroupComponent(schema))
        return buf;
      let rootName = parentGroupNames.length ? parentGroupNames[0] : name; //组根名字
      const groups = [...parentGroupNames, name];
      const { sortable, ...otherCoumnProps } = columnProps;
      const childrenColumns = getTableColumns(children, groups);

      return buf.concat({
        ...otherCoumnProps,
        //children不赋空，defaultSortOrder不起作用
        children: childrenColumns.length ? childrenColumns : undefined,
        key,
        dataIndex: name,
        sorter: sortable ? { multiple: (key + 1) } : undefined,
        render: !children.length
          ? (value: any, record: any, index: number) => {
            let childrenCom: any = <TextView inherited={false}></TextView>
            if (schema.properties && Object.keys(schema.properties).length > 0) {
              const properties = Schema.getOrderProperties(schema);
              childrenCom = [];
              for (const property of properties) {
                childrenCom.push(
                  <RecursionField schema={property.schema} name={property.schema?.name} />
                )
              }
            }

            if (groups.length > 0) {
              for (let i = groups.length - 1; i > 0; i--) {
                const groupName = groups[i];
                childrenCom = <ReactField name={groupName}>
                  {childrenCom}
                </ReactField>;
              }
            }

            childrenCom = schema?.['x-field-source']?.name
              ?
              <ReactField name={rootName} value={record?.[rootName]}>
                {childrenCom}
              </ReactField>
              :
              <VoidField name={rootName}>
                {childrenCom}
              </VoidField>

            return (
              <ArrayBase.Item index={index} record={record}>
                <ReactField name={index}>
                  <CellRoot instance={record}>
                    {childrenCom}
                  </CellRoot>
                </ReactField>
              </ArrayBase.Item>
            );
          }
          : undefined,
      });
    }, []);
  }, []);

  return getTableColumns;
}
