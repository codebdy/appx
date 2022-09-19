import { Card } from "antd"
import React, { memo } from "react"
import { useTranslation } from "react-i18next"
import { PluginList } from "./PluginList"

export const AppPlugins = memo(() => {
  const { t } = useTranslation();
  return (
    <div
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div
        style={{
          width: 800,
          marginTop: 16,
        }}
      >
        <Card title={t("Plugins.Title")}>
          <PluginList />
        </Card>
      </div>
    </div>
  )
})