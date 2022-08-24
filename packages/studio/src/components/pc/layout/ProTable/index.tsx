import { Card, TableProps } from "antd"
import React, { useCallback, useMemo, useState } from "react"
import { IProTableParams, ProTableContext } from "./context"
import "./index.less"
import locales, { LOCALES_NS } from "./locales"
import { Table } from "./Table"
import { ITableBatchActionsProps, TableBatchActions } from "./TableBatchActions"
import { observer } from "@formily/reactive-react"
import { registerResourceBundle } from "../../../../i18n/registerResourceBundle"
import { IDataSourceableProps } from "../../../common/IDataSourceableProps"
import TableToolbar, { ITableToolbarProps } from "./TableToolbar"
import { IDataSource } from "../../../../datasource"
import clx from "classnames";
import { RecursionField, useFieldSchema } from '@formily/react';
import { IQueryFormProps, QueryForm } from "./QueryForm"
import { TableIndex } from "./TableIndex"

registerResourceBundle(LOCALES_NS, locales);

export interface IProTableProps extends IDataSourceableProps {
  className?: string,
  hasQueryForm?: boolean,
  hasToolbar?: boolean,
  selectable?: boolean,
  dataSource?: IDataSource,
}

export const ProTable: React.FC<IProTableProps> & {
  QueryForm?: React.FC<IQueryFormProps>,
  TableToolbar?: React.FC<ITableToolbarProps>,
  TableBatchActions?: React.FC<ITableBatchActionsProps>,
  Table?: React.FC<TableProps<any>>,
  Index?: React.FC,
} = observer((
  props: IProTableProps
) => {
  const {
    hasQueryForm = true,
    hasToolbar = true,
    selectable = true,
    className,
    dataSource,
    ...other
  } = props;
  const [params, setParams] = useState<IProTableParams>();
  const fieldSchema = useFieldSchema();

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
      } else if (childSchema["x-component"] === 'ProTable.TableBatchActions') {
        slts.tableBatchActions = childSchema
      } else if (childSchema["x-component"] === 'ProTable.TableToolbar') {
        slts.tableToolbar = childSchema;
      }
    }

    return slts
  }, [fieldSchema.properties])


  const handleSelectedChange = useCallback((keys?: React.Key[]) => {
    setParams(params => ({ ...params, selectedRowKeys: keys }))
  }, [])

  return (
    <ProTableContext.Provider
      value={{
        ...params,
        onSelectedChange: handleSelectedChange
      }}
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
ProTable.TableToolbar = TableToolbar
ProTable.TableBatchActions = TableBatchActions
ProTable.Table = Table
ProTable.Index = TableIndex
