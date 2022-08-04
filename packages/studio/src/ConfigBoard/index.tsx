import { Switch } from "antd";
import React, { memo } from "react";

const ConfigBoard = memo(() => {
  return (
    <div>
      多语言
      <Switch defaultChecked />
      多语言资源
    </div>
  )
})

export default ConfigBoard;