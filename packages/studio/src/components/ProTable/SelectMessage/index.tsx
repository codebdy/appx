import { Alert, Button, Space } from "antd"
import React, { memo } from "react";
import { useLocalTranslations } from "../hooks/useLocalTranslations";

const SelectMessage = memo(() => {
  const { t } = useLocalTranslations()
  return (
    <Alert
      message={
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            {t("SelecteMessage", { count: 3 })}
            <Button type="link">{t("CancelSelect")}</Button>
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
})

export default SelectMessage;