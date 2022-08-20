import { PlusOutlined, ReloadOutlined } from "@ant-design/icons"
import { Button, Tooltip } from "antd"
import React, { memo } from "react"
import { useLocalTranslations } from "../hooks/useLocalTranslations"
import ColumnsSettings from "./ColumnsSettings"
import HeightMenu from "./HeightMenu"
import clx from "classnames"

export interface ITableToolbarProps {
  title?: string,
  className?: string,
}

const TableToolbar = memo((
  props: ITableToolbarProps
) => {
  const { title, className, ...other } = props;
  const { t } = useLocalTranslations();

  return (
    <div {...other}
      className={clx(className, "table-toolbar")}
    >
      <div>
        {title}
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