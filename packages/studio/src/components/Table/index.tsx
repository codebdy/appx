import { Card } from "antd"
import React, { memo } from "react"
import "./index.less"
import { QueryFormExample } from "./QueryForm"

const ProTable = memo(()=>{
  return (
    <div className="appx-pro-table">
      <Card>
        <QueryFormExample />
      </Card>
    </div>
  )
})

export default ProTable