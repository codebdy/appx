import { Card } from "antd"
import React, { useCallback, useRef, useState } from "react"
import { IProTableParams, ProTableContext } from "./context"
import "./index.less"
import locales, { LOCALES_NS } from "./locales"
import { DataTable } from "./Table"
import { TableBatchActions } from "./TableBatchActions"
import { observer } from "@formily/reactive-react"
import {
  useField,
} from '@formily/react'
import { ArrayField } from '@formily/core'
import { usePrefixCls } from "@formily/antd/esm/__builtins__"
import { registerResourceBundle } from "../../../../i18n/registerResourceBundle"
import { IDataSourceableProps } from "../../../common/IDataSourceableProps"
import TableToolbar from "./TableToolbar"
import { IDataSource } from "../../../../datasource"
import clx from "classnames";

registerResourceBundle(LOCALES_NS, locales);

export interface IProTableProps extends IDataSourceableProps {
  className?: string,
  hasQueryForm?: boolean,
  hasToolbar?: boolean,
  selectable?: boolean,
  dataSource?: IDataSource,
}

export const ProTable = observer((
  props: IProTableProps
) => {
  const {
    hasQueryForm = true,
    hasToolbar = true,
    selectable = true,
    className,
    dataSource,
    items,
    ...other
  } = props;
  const [params, setParams] = useState<IProTableParams>();
  const slots = {
    queryForm: null,
    table: null,
    tableBatchActions: null,
    tableToolbar: null,
  }

  const ref = useRef<HTMLDivElement>()
  const field = useField<ArrayField>()
  const prefixCls = usePrefixCls('appx-pro-table')
  //const dataSource = Array.isArray(field.value) ? field.value.slice() : []
  // const sources = useArrayTableSources()
  //const columns = useArrayTableColumns(dataSource, sources)

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
        <Card>

        </Card>
        <Card style={{ marginTop: "16px" }}>
          <TableToolbar />
          <TableBatchActions />
          <DataTable />
        </Card>
      </div>
    </ProTableContext.Provider>
  )
})
