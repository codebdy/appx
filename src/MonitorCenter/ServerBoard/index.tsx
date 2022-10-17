import { Breadcrumb } from "antd";
import React from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"

export const ServerBoard = memo(() => {
  const { t } = useTranslation();
  return (
    <div className="monitor-board-content">
      <Breadcrumb className="monitor-breadcrumb">
        <Breadcrumb.Item>{t("Monitor.Title")}</Breadcrumb.Item>
        <Breadcrumb.Item>{t("Monitor.ServerStatus")}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
})