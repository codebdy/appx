import { Card } from "antd"
import React, { memo } from "react"
import "./index.less"
import { QueryFormExample } from "./QueryForm"
import QueryTable from "./QueryTable"

const ProTable = memo(() => {
  return (
    <div className="appx-pro-table">
      <Card>
        <QueryFormExample />
      </Card>
      <Card style={{ marginTop: "16px" }}>
        <QueryTable />
      </Card>
    </div>
  )
})

export default ProTable