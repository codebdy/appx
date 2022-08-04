import { Alert, Button } from "antd"
import React from "react";

const SelectMessage = () => {
  return (
    <Alert
      message={
        <div style={{ display: "flex", justifyContent: "space-between", alignItems:"center" }}>
          <div>
            已选择 1 项
          </div>
          <Button type="link">取消选择</Button>
        </div>
      }
      type="info"
      style={{ marginTop: 16, marginBottom: 16 }}
    />
  )
}

export default SelectMessage;