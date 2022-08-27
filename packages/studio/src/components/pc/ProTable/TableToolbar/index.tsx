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
  hasNewButton?: boolean,
  hasRefresh?: boolean,
  hasHeight?: boolean,
  hasSettings?: boolean,
}

const TableToolbar = memo((
  props: ITableToolbarProps
) => {
  const {
    title,
    className,
    hasNewButton = true,
    hasRefresh = true,
    hasHeight = true,
    hasSettings = true,
    ...other
  } = props;
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

        {
          hasNewButton &&
          <Button
            type="primary"
            icon={
              <PlusOutlined />
            }
          >
            {t("New")}
          </Button>
        }

        {
          hasRefresh &&
          <Tooltip title={t("Refresh")}>
            <Button shape="circle" size="large" type="text" style={{ marginLeft: 8 }}>
              <ReloadOutlined />
            </Button>
          </Tooltip>
        }

        {
          hasHeight &&
          <HeightMenu />
        }

        {
          hasSettings &&
          <ColumnsSettings />
        }
      </div>
    </div>
  )
})

export default TableToolbar