import { Card } from "antd"
import React, { memo } from "react"
import "./index.less"
import { QueryFormExample } from "./QueryForm"
import QueryTable from "./QueryTable"
import QueryToolbar from "./QueryToolbar"
import SelectMessage from "./SelectMessage"

const ProTable = memo(() => {
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