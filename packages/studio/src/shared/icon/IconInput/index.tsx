import { BorderOutlined, CloseCircleFilled, StarOutlined } from "@ant-design/icons";
import { Badge, Button } from "antd";
import React, { useCallback } from "react";
import { memo } from "react"

const IconInput = memo(() => {
  const handelRemove = useCallback(() => {
    console.log("哈哈哈shandiao ")
  }, []);

  return (
    <div style={{
      display: "flex",
      alignItems: "center"
    }}>
      <Badge
        count={
          <Button
            icon={<CloseCircleFilled style={{ color: "grey" }} />}
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