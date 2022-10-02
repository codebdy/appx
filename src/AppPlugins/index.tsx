import { Card } from "antd"
import React, { memo } from "react"
import { useTranslation } from "react-i18next"
import AppRoot from "../shared/AppRoot"
import { PluginList } from "./PluginList"
import { UploadDialog } from "./UploadDialog"

export const AppPlugins = memo(() => {
  const { t } = useTranslation();
  return (
    <AppRoot>
      <div
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          style={{
            width: 800,
            marginTop: 16,
          }}
        >
          <Card title={t("Plugins.Installed")} extra={<UploadDialog />}>
            <PluginList />
          </Card>
        </div>
      </div>
    </AppRoot>
  )
})