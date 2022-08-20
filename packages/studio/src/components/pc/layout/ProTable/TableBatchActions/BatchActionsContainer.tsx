import { Alert, Button, Space } from "antd";
import React from "react";
import { memo } from "react"
import { useLocalTranslations } from "../hooks/useLocalTranslations";
import clx from "classnames";

export const BatchActionsContainer = memo((
  props: {
    counts?: number,
    className?: string,
    children?: React.ReactNode
  }
) => {
  const { counts, className, children, ...others } = props;
  const { t } = useLocalTranslations();
  return (
    <Alert
      message={
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            {t("SelecteMessage", { count: counts })}
            <Button type="link">{t("CancelSelect")}</Button>
          </div>
          <Space style={{ display: 'flex', alignItems: 'center' }}>
            {
              children
            }
            <Button>批量删除</Button>
            <Button type="primary">批量审批</Button>
          </Space>
        </div>
      }
      type="info"
      {...others}
      className={clx(className, "table-batch-actions")}
    />
  )
})