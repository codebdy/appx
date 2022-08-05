import { Card } from "antd"
import React, { memo, useState } from "react"
import { registerResourceBundle } from "../../i18n/registerResourceBundle"
import { IProTableParams, ProTableContext } from "./context"
import "./index.less"
import locales, { LOCALES_NS } from "./locales"
import { QueryFormExample } from "./QueryForm"
import QueryTable from "./QueryTable"
import QueryToolbar from "./QueryToolbar"
import SelectMessage from "./SelectMessage"

registerResourceBundle(LOCALES_NS, locales);

const ProTable = memo(() => {
  const [params, setParams] = useState<IProTableParams>();

  return (
    <ProTableContext.Provider value={params}>
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