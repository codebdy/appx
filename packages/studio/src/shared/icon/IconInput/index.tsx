import { StarOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { memo } from "react"

const IconInput = memo(() => {
  return (
    <div>
      <Button icon={<StarOutlined />} />
    </div>
  )
})

export default IconInput;