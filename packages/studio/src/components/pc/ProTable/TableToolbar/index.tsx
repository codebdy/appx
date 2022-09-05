import { PlusOutlined, ReloadOutlined } from "@ant-design/icons"
import { Button, message, Tooltip } from "antd"
import React, { useCallback, useEffect } from "react"
import { useLocalTranslations } from "../hooks/useLocalTranslations"
import ColumnsSettings from "./ColumnsSettings"
import HeightMenu from "./HeightMenu"
import clx from "classnames"
import { IAppxAction, useDoActions } from "../../../../shared/action"
import { useProTableParams } from "../context"
import { useComponentConfig } from "../../../../shared/AppRoot/hooks/useComponentConfig"
import { observer } from "@formily/reactive-react"
import { IProTableConfig } from "../context/IProTableConfig"

export interface ITableToolbarProps {
  title?: string,
  className?: string,
  hasNewButton?: boolean,
  hasRefresh?: boolean,
  hasHeight?: boolean,
  hasSettings?: boolean,
  onNew?: IAppxAction[],
}

export const TableToolbar = observer((
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
  const params = useProTableParams();
  const doActions = useDoActions();
  const tableConfig: IProTableConfig = useComponentConfig(params.path);

  useEffect(() => {
    params.tableConfig = tableConfig;
  }, [params, tableConfig])

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

  const handleRefresh = useCallback(() => {
    params.refreshFlag = params.refreshFlag ? (params.refreshFlag + 1) : 1
  }, [params]);

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
