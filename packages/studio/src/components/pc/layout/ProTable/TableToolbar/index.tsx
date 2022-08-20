import { PlusOutlined, ReloadOutlined } from "@ant-design/icons"
import { Button, Tooltip } from "antd"
import React, { memo } from "react"
import { useLocalTranslations } from "../hooks/useLocalTranslations"
import ColumnsSettings from "./ColumnsSettings"
import HeightMenu from "./HeightMenu"

export interface ITableToolbarProps {

}

const TableToolbar = memo((
  props: ITableToolbarProps
) => {
  const { t } = useLocalTranslations();

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }}>
      <div>
        查询表格
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >

        <Button
          type="primary"
          icon={
            <PlusOutlined />
          }
        >
          {t("New")}
        </Button>
        <Tooltip title={t("Refresh")}>
          <Button shape="circle" size="large" type="text" style={{ marginLeft: 8 }}>
            <ReloadOutlined />
          </Button>
        </Tooltip>
        <HeightMenu />
        <ColumnsSettings />
      </div>
    </div>
  )
})

export default TableToolbar