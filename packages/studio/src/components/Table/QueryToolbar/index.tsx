import { PlusOutlined } from "@ant-design/icons"
import { Button, Space } from "antd"
import React, { memo } from "react"

const QueryToolbar = memo(() => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }}>
      <div>
        查询表格
      </div>
      <Space
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >

        <Button
          type="primary"
          icon = {
            <PlusOutlined />
          }
        >
          新建
        </Button>
      </Space>
    </div>
  )
})

export default QueryToolbar