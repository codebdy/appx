import { BorderOutlined, CloseCircleFilled } from "@ant-design/icons";
import { Badge, Button } from "antd";
import React, { useCallback } from "react";
import { memo } from "react"
import "./style.less"

const IconInput = memo(() => {
  const handelRemove = useCallback(() => {
    console.log("哈哈哈shandiao ")
  }, []);

  return (
    <div 
      className="icon-input"
    style={{
      display: "flex",
      alignItems: "center"
    }}>
      <Badge
        count={
          <Button
            icon={<CloseCircleFilled className="icon-remove-button-icon" />}
            type="text"
            size="small"
            onClick={handelRemove}
          />
        }
      >
        <Button icon={<BorderOutlined style={{ color: "transparent" }} />} />
      </Badge>

    </div>
  )
})

export default IconInput;