import { Card, TableProps } from "antd"
import React, { useMemo } from "react"
import { ProTableContext } from "./context"
import "./style.less"
import locales, { LOCALES_NS } from "./locales"
import { Table } from "./Table"
import { ITableBatchActionsProps, TableBatchActions } from "./TableBatchActions"
import { observer } from "@formily/reactive-react"
import { registerResourceBundle } from "../../../i18n/registerResourceBundle"
import { IDataSourceableProps } from "../../common/IDataSourceableProps"
import { TableToolbar, ITableToolbarProps } from "./TableToolbar"
import clx from "classnames";
import { RecursionField, useFieldSchema, useField } from '@formily/react';
import { IQueryFormProps, QueryForm } from "./QueryForm"
import { TableIndex } from "./TableIndex"
import { observable } from "@formily/reactive"
import { ITableToolbarActionsProps, TableToolbarActions } from "./TableToolbarActions"

registerResourceBundle(LOCALES_NS, locales);

export interface IProTableProps extends IDataSourceableProps {
  className?: string,
  hasQueryForm?: boolean,
  hasToolbar?: boolean,
  selectable?: boolean,
  paginationPosition?: "bottomLeft" | "bottomCenter" | "bottomRight",
  pageSize?: number,
}

export const ProTable: React.FC<IProTableProps> & {
  QueryForm?: React.FC<IQueryFormProps>,
  Toolbar?: React.FC<ITableToolbarProps>,
  ToolbarActions?: React.FC<ITableToolbarActionsProps>,
  BatchActions?: React.FC<ITableBatchActionsProps>,
  Table?: React.FC<TableProps<any>>,
  Index?: React.FC,
  Column?: React.FC,
} = observer((
  props: IProTableProps
) => {
  const {
    hasQueryForm = true,
    hasToolbar = true,
    selectable = true,
    className,
    dataBind,
    paginationPosition,
    pageSize,
    ...other
  } = props;
  const field = useField();
  const params = useMemo(() => {
    return observable({
      selectable,
      dataBind,
      current: 1,
      paginationPosition,
      pageSize: pageSize || 10,
      path: field.path.toString()
    });
  }, [dataBind, field.path, pageSize, paginationPosition, selectable]);
  const fieldSchema = useFieldSchema();

  console.log("ProTable 刷新")

  const slots = useMemo(() => {
    const slts = {
      queryForm: null,
      dataTable: null,
      tableBatchActions: null,
      tableToolbar: null,
    }

    for (const key of Object.keys(fieldSchema?.properties || {})) {
      const childSchema = fieldSchema.properties[key]
      if (childSchema["x-component"] === 'ProTable.QueryForm') {
        slts.queryForm = childSchema
      } else if (childSchema["x-component"] === 'ProTable.Table') {
        slts.dataTable = childSchema
      } else if (childSchema["x-component"] === 'ProTable.BatchActions') {
        slts.tableBatchActions = childSchema
      } else if (childSchema["x-component"] === 'ProTable.Toolbar') {
        slts.tableToolbar = childSchema;
      }
    }

    return slts
  }, [fieldSchema.properties])


  // const handleSelectedChange = useCallback((keys?: React.Key[]) => {
  //   setParams(params => ({ ...params, selectedRowKeys: keys }))
  // }, [])

  // const handelSetQuery = useCallback((queryForm) => {
  //   setParams(params => ({ ...params, queryForm: queryForm }))
  // }, [])

  // const handleTableChange = useCallback((changeParams: ITableChangeParams) => {
  //   setParams(params => ({ ...params, ...changeParams }))
  // }, [])

  // const contextValue = useMemo(() => {
  //   return {
  //     ...params,
  //     onSelectedChange: handleSelectedChange,
  //     onSetQueryForm: handelSetQuery,
  //     onTableChange: handleTableChange,
  //   }
  // }, [handelSetQuery, handleSelectedChange, handleTableChange, params])

  //const basePath = useMemo(() => field.path, [field.path]);

  return (
    <ProTableContext.Provider
      value={params}
    >
      <div className={clx("appx-pro-table", className)} {...other}>
        {
          hasQueryForm && slots.queryForm && <RecursionField schema={slots.queryForm} name={slots.queryForm.name} />
        }
        <Card style={{ marginTop: "16px" }}>
          {
            hasToolbar && slots.tableToolbar && <RecursionField schema={slots.tableToolbar} name={slots.tableToolbar.name} />
          }
          {
            selectable && slots.tableBatchActions && <RecursionField schema={slots.tableBatchActions} name={slots.tableBatchActions.name} />
          }
          {
            <RecursionField schema={slots.dataTable} name={slots.dataTable.name} />
          }
        </Card>
      </div>
    </ProTableContext.Provider>
  )
})

ProTable.QueryForm = QueryForm
ProTable.Toolbar = TableToolbar
ProTable.ToolbarActions = TableToolbarActions
ProTable.BatchActions = TableBatchActions
ProTable.Table = Table
ProTable.Index = TableIndex