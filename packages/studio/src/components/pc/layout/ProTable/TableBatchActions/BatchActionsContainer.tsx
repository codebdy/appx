import { Alert, Button, Space } from "antd";
import React from "react";
import { memo } from "react"
import { useLocalTranslations } from "../hooks/useLocalTranslations";
import clx from "classnames";

export const BatchActionsContainer = memo((
  props: {
    counts?: number,
    className?: string,
    children?: React.ReactNode,
    onClear?: () => void,
  }
) => {
  const { counts, className, children, onClear, ...others } = props;
  const { t } = useLocalTranslations();
  return (
    <Alert
      message={
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            {
              !!counts &&
              <>
                {t("SelecteMessage", { count: counts })}
                <Button type="link" onClick={onClear}>{t("CancelSelect")}</Button>
              </>
            }

          </div>
          <Space style={{ display: 'flex', alignItems: 'center' }}>
            {
              children
            }
          </Space>
        </div>
      }
      type="info"
      {...others}
      className={clx(className, "table-batch-actions")}
    />
  )
})