import { TableProps } from 'antd';
import React, { useCallback } from 'react';
import { useProTableParams } from '../context';
import { ArrayBase } from "@formily/antd";
import {
  RecursionField,
  Field as ReactField,
  VoidField
} from '@formily/react';
import { Field } from '@formily/core';
import { TextView } from '../../';
import { useField, Schema } from '@formily/react';
import { InstanceContext } from '../../../../shared/contexts/instance';
import { ObservableColumnSource, } from './index';
import { isColumnComponent, isColumnGroupComponent } from './useArrayTableSources';

export function useGetTableColumns() {
  const { dataBind } = useProTableParams();
  const field = useField();
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
              <InstanceContext.Provider
                value={{
                  field: field as Field,
                  instance: record,
                  entityName: dataBind.entityName,
                }}
              >
                <ArrayBase.Item index={index} record={record}>
                  <ReactField name={index}>
                    {childrenCom}
                  </ReactField>
                </ArrayBase.Item>
              </InstanceContext.Provider>
            );
          }
          : undefined,
      });
    }, []);
  }, [dataBind.entityName, field]);

  return getTableColumns;
}
