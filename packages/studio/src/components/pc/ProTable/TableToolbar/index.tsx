import { PlusOutlined, ReloadOutlined } from "@ant-design/icons"
import { Button, message, Tooltip } from "antd"
import React, { memo, useCallback } from "react"
import { useLocalTranslations } from "../hooks/useLocalTranslations"
import ColumnsSettings from "./ColumnsSettings"
import HeightMenu from "./HeightMenu"
import clx from "classnames"
import { IAppxAction, useDoActions } from "../../../../shared/action"

export interface ITableToolbarProps {
  title?: string,
  className?: string,
  hasNewButton?: boolean,
  hasRefresh?: boolean,
  hasHeight?: boolean,
  hasSettings?: boolean,
  onNew?: IAppxAction[],
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
    onNew,
    ...other
  } = props;
  const { t } = useLocalTranslations();

  const doActions = useDoActions();

  const handleNew = useCallback(() => {
    if (!onNew) {
      return;
    }
    doActions(onNew)
      .then(() => {
      })
      .catch((error) => {
        message.error(error?.message);
        console.error(error);
      })
      ;
  }, [doActions, onNew])

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

            onClick={handleNew}
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