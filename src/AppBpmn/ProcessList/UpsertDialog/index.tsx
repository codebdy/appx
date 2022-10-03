import { PlusOutlined } from "@ant-design/icons"
import { Button } from "antd"
import React from "react"

export const UpsertDialog = () => {
  return (
    <>
      <Button
        shape="circle"
        type="text"
        size="small"
        icon={<PlusOutlined />}
        onClick={e => e.stopPropagation()}
      ></Button>
    </>
  )
}