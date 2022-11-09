import { DeleteOutlined } from "@ant-design/icons"
import { Button } from "antd"
import React from "react"
import { memo } from "react"
import { ITemplateInfo } from "~/model"

export const DeleteTemplateButton = memo((
  props: {
    template: ITemplateInfo
  }
) => {
  const { template } = props;
  return (
    <Button type="text" shape="circle" icon={<DeleteOutlined />}></Button>
  )
})