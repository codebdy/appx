import { ReloadOutlined } from "@ant-design/icons"
import { Button, Tooltip } from "antd"
import React, { useCallback } from "react"
import { useLocalTranslations } from "../hooks/useLocalTranslations"
import ColumnsSettings from "./ColumnsSettings"
import HeightMenu from "./HeightMenu"
import clx from "classnames"
import { useProTableParams } from "../context"
import { observer } from "@formily/reactive-react"
import { ITableToolbarProps } from "."

export interface ITableToolbarShellProps {
  className?:string,
  children?:React.ReactNode,
  actions?:React.ReactNode,
}

export const TableToolbarShell = observer((
  props: ITableToolbarProps &ITableToolbarShellProps
) => {
  const {
    className,
    children,
    actions,
    hasRefresh = true,
    hasHeight = true,
    hasSettings = true,
    ...other
  } = props;
  const { t } = useLocalTranslations();
  const params = useProTableParams();

  const handleRefresh = useCallback(() => {
    params.refreshFlag = params.refreshFlag ? (params.refreshFlag + 1) : 1
  }, [params]);

  return (
    <div {...other}
      className={clx(className, "table-toolbar")}
    >
      <div>
        {children}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {
          actions
        }
        {
          hasRefresh &&
          <Tooltip title={t("Refresh")}>
            <Button
              shape="circle"
              size="large"
              type="text"
              style={{ marginLeft: 8 }}
              onClick={handleRefresh}
            >
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
