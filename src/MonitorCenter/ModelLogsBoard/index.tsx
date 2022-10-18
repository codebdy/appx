import { Breadcrumb } from "antd";
import React from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next";
import { ModelLogsTable } from "./ModelLogsTable";

export const ModelLogsBoard = memo(()=>{
  const { t } = useTranslation();

  return (
    <div className="monitor-board-content">
      <Breadcrumb className="monitor-breadcrumb">
        <Breadcrumb.Item>{t("Monitor.Title")}</Breadcrumb.Item>
        <Breadcrumb.Item>{t("Monitor.Logs")}</Breadcrumb.Item>
        <Breadcrumb.Item>{t("Monitor.ModelLogs")}</Breadcrumb.Item>
      </Breadcrumb>
      <ModelLogsTable />
    </div>
  )
})