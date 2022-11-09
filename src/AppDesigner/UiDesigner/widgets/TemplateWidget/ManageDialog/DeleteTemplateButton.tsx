import { DeleteOutlined } from "@ant-design/icons"
import { Button } from "antd"
import React from "react"
import { memo } from "react"

export const DeleteTemplateButton = memo(() => {
  return (
    <Button  type="text" shape="circle" icon={<DeleteOutlined />}></Button>
  )
})