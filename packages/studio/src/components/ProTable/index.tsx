import { Card } from "antd"
import React, { memo, useCallback, useState } from "react"
import { registerResourceBundle } from "../../i18n/registerResourceBundle"
import { IProTableParams, ProTableContext } from "./context"
import "./index.less"
import locales, { LOCALES_NS } from "./locales"
import { QueryFormExample } from "./QueryForm"
import QueryTable from "./QueryTable"
import QueryToolbar from "./QueryToolbar"
import SelectMessage from "./SelectMessage"
import {ISchemaFieldComponentProps} from "@formily/react-schema-renderer"

registerResourceBundle(LOCALES_NS, locales);

const ProTable = memo((
  props: ISchemaFieldComponentProps & { className: string }
) => {
  const [params, setParams] = useState<IProTableParams>();

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
      <div className="appx-pro-table">
        <Card>
          <QueryFormExample />
        </Card>
        <Card style={{ marginTop: "16px" }}>
          <QueryToolbar />
          <SelectMessage />
          <QueryTable />
        </Card>
      </div>
    </ProTableContext.Provider>
  )
})

export default ProTable