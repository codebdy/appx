import { Button, Checkbox, Space } from "antd"
import React from "react"
import { useLocalTranslations } from "../../hooks/useLocalTranslations"

export const TitleBox = () => {
  const { t } = useLocalTranslations();

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      padding: "8px 0 ",
    }}>
      <Checkbox>{t("ShowColumns")}</Checkbox>
      <Space>
        <Button type="link" size="small">
          {t("Reset")}
        </Button>
      </Space>
    </div>
  )
}
