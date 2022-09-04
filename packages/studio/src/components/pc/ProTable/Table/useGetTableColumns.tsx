import { TableProps } from 'antd';
import React, { useCallback } from 'react';
import { useProTableParams } from '../context';
import { ArrayBase } from "@formily/antd";
import {
  RecursionField,
  Field as ReactField
} from '@formily/react';
import { Field } from '@formily/core';
import { TextView } from '../../';
import { useField } from '@formily/react';
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
            let children = (
              schema.properties && Object.keys(schema.properties).length > 0
                ? <RecursionField schema={schema} onlyRenderProperties />
                : <TextView inherited={false}></TextView>
            );
            for (let i = groups.length - 1; i > 0; i--) {
              const groupName = groups[i];
              children = <ReactField name={groupName}>
                {children}
              </ReactField>;
            }

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
                    <ReactField name={rootName} value={record?.[rootName]}>
                      {children}
                    </ReactField>
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
