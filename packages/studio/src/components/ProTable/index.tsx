import { Card } from "antd"
import React, { memo } from "react"
import { useResourceBundles } from "../../i18n/useResourceBundles"
import "./index.less"
import locales, { LOCALES_NS } from "./locales"
import { QueryFormExample } from "./QueryForm"
import QueryTable from "./QueryTable"
import QueryToolbar from "./QueryToolbar"
import SelectMessage from "./SelectMessage"

const ProTable = memo(() => {
  useResourceBundles(LOCALES_NS, locales);
  
  return (
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
  )
})

export default ProTable