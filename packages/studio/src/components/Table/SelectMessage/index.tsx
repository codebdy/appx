import { Alert, Button, Space } from "antd"
import React from "react";

const SelectMessage = () => {
  return (
    <Alert
      message={
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            已选择 1 项
            <Button type="link">取消选择</Button>
          </div>
          <Space style={{ display: 'flex', alignItems: 'center' }}>
            <Button>批量删除</Button>
            <Button type="primary">批量审批</Button>
          </Space>
        </div>
      }
      type="info"
      style={{ marginTop: 16, marginBottom: 16 }}
    />
  )
}

export default SelectMessage;