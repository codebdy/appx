import { Button, Checkbox, Space } from "antd"
import React from "react"
import { memo } from "react"

export const TitleBox = memo(() => {

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      padding: "8px 0 ",
    }}>
      <Checkbox>列展示</Checkbox>
      <Space>
        <Button type="link" size="small">
          重置
        </Button>
      </Space>
    </div>
  )
})

export default TitleBox