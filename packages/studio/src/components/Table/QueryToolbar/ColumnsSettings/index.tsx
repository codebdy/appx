import { SettingOutlined } from "@ant-design/icons";
import { Button, Popover, Tooltip } from "antd";
import React from "react"
import { memo } from "react"

const ColumnsSettings = memo(() => {

  const content = (
    <div>
      哈哈
    </div>
  );
  return (
    <Popover
      content={content}
      title="Title"
      trigger="click"
      placement="bottom"
    >
      <Tooltip title="列设置">
        <Button shape="circle" size="large" type="text" onClick={e => e.preventDefault()}>
          <SettingOutlined />
        </Button>
      </Tooltip>
    </Popover>
  )

})

export default ColumnsSettings