import { observer } from "@formily/reactive-react"
import { Card } from "antd"
import React from "react"
import { QueryFormExample } from "../ProTable/QueryForm"
import QueryTable from "../ProTable/QueryTable"
import QueryToolbar from "../ProTable/QueryToolbar"
import SelectMessage from "../ProTable/SelectMessage"

export const ProTableDesigner = observer(() => {
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