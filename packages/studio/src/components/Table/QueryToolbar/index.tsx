import { ColumnHeightOutlined, PlusOutlined, ReloadOutlined, SettingOutlined } from "@ant-design/icons"
import { Button, Tooltip } from "antd"
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >

        <Button
          type="primary"
          icon={
            <PlusOutlined />
          }
        >
          新建
        </Button>
        <Tooltip title="刷新">
          <Button shape="circle" size="large" type="text" style={{ marginLeft: 8 }}>
            <ReloadOutlined />
          </Button>
        </Tooltip>
        <Tooltip title="密度">
          <Button shape="circle" size="large" type="text">
            <ColumnHeightOutlined />
          </Button>
        </Tooltip>
        <Tooltip title="列设置">
          <Button shape="circle" size="large" type="text">
            <SettingOutlined />
          </Button>
        </Tooltip>
      </div>
    </div>
  )
})

export default QueryToolbar